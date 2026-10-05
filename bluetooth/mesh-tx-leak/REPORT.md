# Retest: "Bluetooth: MGMT: fix mesh_tx leak on hci_cmd_sync_queue() failure"

Independent re-run of the testing described in the Tested-by reply to
Hui Peng's patch (patchwork 14831271,
`<20260919115436.3998954-1-benquike@gmail.com>`), checking every claim in
that reply and recording what it leaves out.

**Bottom line.** All of the reply's claims reproduce: the leak with
`-ENETDOWN` and `-ENOMEM`, double completion and double start, Busy after
three failures, and the kmemleak reports for `-ENETDOWN`, `-ENOMEM` and
`-ENODEV`. The patched kernel behaves as stated, and the testers give
identical per-case results. The kmemleak claim for `-ENETDOWN` and
`-ENODEV` only holds when the slab caches are shrunk before scanning;
plain scans missed both on this kernel. The reply also omits several
significant facts, listed under
[What the reply leaves out](#what-the-reply-leaves-out).

## Setup

| Item | Value |
|---|---|
| Kernel base | bluetooth-next `036d4119079a` ("Bluetooth: btusb: add ASUS 0b05:1825 to QCA Rome quirks"), which was the tree's `master` at test time |
| Patch | patchwork 14831271 mbox, `git am` onto the base without conflicts (`kernel/mesh-tx-leak-fix.diff`, mbox sha256 in `kernel/patch-mbox.sha256`) |
| Builds | `control` (base), `patched` (base + patch), `diag-control` (base + test-only delay knob), `diag-patched` (delay knob + patch) |
| Config | `x86_64_defconfig` + BlueZ `doc/tester.config` (KASAN, PROVE_LOCKING/lockdep, DEBUG_ATOMIC_SLEEP, …) + `kernel/fault.config` (FAILSLAB, fault-injection debugfs, stacktrace filter, KASAN_INLINE); the `diag-*` builds also have `kernel/kmemleak.config` (DEBUG_KMEMLEAK). Full `.config` files are in `kernel/` |
| Toolchain | gcc 13.3.0 (Ubuntu 24.04) |
| VM | QEMU 8.2.2 driven by BlueZ `tools/test-runner`, **TCG (no KVM available)**, 1024 MB, 1 or 4 vCPUs, one fresh VM per scenario |
| BlueZ | `7edaa61403390fe1cf2f1fb6d45fdd90fe6e93b3` (master at test time): `test-runner`, `mgmt-tester`, `mesh-tester`, and emulator code for the reproducer |
| Controller | BlueZ emulated controller (hciemu/btdev over `/dev/vhci`): `BREDRLE` for legacy advertising, `BREDRLE50` for extended advertising |
| Reproducer | `mesh-leak-check.c` (this directory) |

### How each failure is produced

* **`-ENETDOWN`**: LE on, mesh experimental feature on, controller powered
  on and then off (`HCI_UP` verified clear), then Mesh Send.
* **`-ENOMEM`**: failslab, restricted to the reproducer thread
  (`task-filter`) and to call stacks inside `mesh_send()` but not inside
  `mgmt_mesh_add()` (stacktrace filter), with one failure armed per send.
  The dumped call trace shows the injected failure at
  `hci_cmd_sync_submit()` ← `mesh_send()`
  (`results/logs/*/enomem-trace-legacy-1cpu.log`).
* **`-ENODEV`** (diag builds only): `mesh_send_test_delay_ms=1500` (see
  `kernel/test-only-mesh-send-delay.patch`, which adds a sleep between
  `mgmt_mesh_add()` and `hci_cmd_sync_queue()`), with the emulated
  controller removed 300 ms into the Mesh Send.

The errno is taken from the kernel's own `Send Mesh Failed %d` message in
each log.

### What is measured

* MGMT: command status, the Read Mesh Features handle list, and Mesh
  Packet Complete events.
* Controller side: the emulator's post-command hook counts writes of each
  request's tagged advertising data and the advertising enables.
* Kernel side: kprobes count `mgmt_mesh_add` (return), `mesh_send_sync`
  and `mgmt_mesh_remove` per handle, plus `hci_release_dev` and
  `hci_sock_destruct`.
* kmemleak: five scan rounds 6 s apart, run both plain and with every
  slab cache shrunk before each scan.
* Every log is checked for KASAN, lockdep and WARNING reports.

## Claim-by-claim

| # | Claim in the reply | Result | Evidence |
|---|---|---|---|
| 1 | Tested on bluetooth-next 036d4119079a, patch applied as posted | **Confirmed.** Applies cleanly; the patched kernel reports `g59f710c1a4bd` on top of `036d4119079a` | `kernel/`, kernel banners in logs |
| 2 | Reachable without fault injection: powered-off Mesh Send reaches `hci_cmd_sync_queue()`, which returns `-ENETDOWN` after the handle has been assigned | **Confirmed.** `Send Mesh Failed -100`; handle 1 assigned (`mgmt_mesh_add` kprobe) | `*/offline-*` |
| 3 | `-ENOMEM` via failslab | **Confirmed.** `Send Mesh Failed -12`, injected in `hci_cmd_sync_submit()` | `*/enomem-*` |
| 4 | Unpatched: the failed handle stays listed in Read Mesh Features | **Confirmed** for both errnos, legacy and extended | `after_failure outstanding=1 handles=1` |
| 5 | Unpatched: when the next transmission ends, a Mesh Packet Complete is reported for the failed handle, and that next request's packet is started on the controller twice | **Confirmed.** Completions `1,2` for a single accepted send (2); `mesh_send_sync` runs twice for handle 2. On the controller: 2 advertising enables (legacy) or 2 advertising-data writes + 2 enables (extended), against 1 on the patched kernel | `summary-main.md` |
| 6 | Three consecutive failures → three handles outstanding → later Mesh Sends from that socket answered Busy | **Confirmed**, and the Busy never clears (see A4 below) | `*/offline-busy-*`, `*/enomem-busy-*` |
| 7 | Patched: no failed handle listed or completed; each accepted send started and completed once; repeated failures leave no outstanding handles | **Confirmed** in all patched runs (the 4th send succeeds) | `summary-main.md` |
| 8 | The powered-off reproducer gives the same control-vs-patched result on a 4-CPU guest | **Confirmed** (also for `-ENOMEM` on 4 CPUs) | `*-4cpu.log` |
| 9 | kmemleak (CONFIG_DEBUG_KMEMLEAK builds) reports leaks from `mgmt_mesh_add()` after socket close and controller removal, unpatched only, for `-ENETDOWN`, `-ENOMEM`, `-ENODEV` | **Confirmed with a caveat.** `-ENOMEM` is reported by plain scans. `-ENETDOWN` and `-ENODEV` were **not** reported by plain scans (0 objects in 5 rounds, legacy and extended); they are reported only when slab caches are shrunk before scanning. Patched diag build: 0 in every case | `summary-kmemleak.md`, see A5 |
| 10 | `-ENODEV` needed a test-only delay in `mesh_send()`, in diagnostic builds of both kernels | **Consistent.** With the delay (1500 ms, controller removed 300 ms in), `Send Mesh Failed -19` in every run. A run without the delay was not attempted | `*/kmemleak-enodev-*` |
| 11 | No KASAN, lockdep or WARNING reports | **Confirmed** on all four builds, all 72 VM runs | all logs |
| 12 | Unmodified mgmt-tester and mesh-tester: identical per-case results with and without the patch | **Confirmed.** mgmt-tester 503/503 on both; mesh-tester 8/10 on both, with the **same two cases failing** (see A1) | `summary-main.md` |

## What the reply leaves out

**A1. Two mesh-tester cases fail on both kernels.** "Mesh - Send cancel
- 1" and "Mesh - Send cancel - 2" time out with and without the patch, so
"identical per-case results" is true but hides two existing failures. The
BlueZ CI run on this patch shows the same two timeouts. That CI run also
reports mgmt-tester "Read Exp Feature - Success" failing out of 501 tests,
while BlueZ `7edaa6140` gives 503/503 here. The results depend on the
BlueZ revision, and the reply does not say which one was used.

**A2. The leaked entry pins the MGMT socket, so closing the socket does
not release it.** `mgmt_mesh_add()` takes `sock_hold(sk)`, and entries are
only cleaned up from `hci_sock_destruct()` → `mgmt_cleanup()`, which can
only run once that reference is dropped. The kprobes show
`hci_sock_destruct` never runs for the MGMT socket on the unpatched
kernels, but does on the patched ones. Two consequences:

* The patch's commit message ("It is only released when the socket is
  closed or the controller goes away") is wrong on both counts. Closing
  the socket does not release the entry, and neither does removing the
  controller, because nothing frees `hdev->mesh_pending` on unregister.
  The entry is only released if a later transmission on the same
  controller "completes" it (A3).
* kmemleak reports the **socket** too: `sk_prot_alloc` ← `hci_sock_create`
  (2048 bytes) and its LSM blob, alongside the `mgmt_mesh_add()` object.
  The reply mentions only the latter.

**A3. The leak crosses sockets.** Socket A fails a Mesh Send while the
controller is powered off, and is closed. Socket B powers the controller
on and sends. B then receives a Mesh Packet Complete for A's handle, and
B's own packet is started twice (`close-reuse-*`, both advertising types).
So one failed send on any socket disturbs the next transmission from any
other socket on that controller.

**A4. Busy is permanent for that socket.** After three failures, powering
the controller on does not help: the fifth send is still Busy. The
outstanding handles can only be completed by a transmission, and the
socket can no longer start one; closing it does not free them either
(A2).

**A5. Plain kmemleak scans miss `-ENETDOWN` and `-ENODEV` on this
kernel.** Five plain scans report nothing, even though the kprobes show the
entry was never freed and the controller was released. Turning off
task-stack scanning does not change this. Shrinking all slab caches before
scanning (`/sys/kernel/slab/*/shrink`) makes the leaks visible from the 2nd
round for `-ENETDOWN` and the 3rd for `-ENODEV`. This fits stale pointers
left in SLUB's per-CPU sheaves: sheaves are kmalloc'd, so kmemleak tracks
and scans them, and handing an object out does not clear its slot. Shrinking
frees cached sheaves. The mechanism is inferred from this behaviour, not
traced to the exact referencing slot. With shrinking, the `-ENODEV` socket object was still not
flagged within 5 rounds, although the kprobes show it was never destroyed.
The reply does not describe its kmemleak procedure (number of scans,
waits, shrinking), which is needed to repeat that result.

**A6. In the single-failure case the leak heals itself; with three
failures it doesn't.** After one failure, the next successful
transmission on that controller removes the stale entry as a side effect
(A3). That is why the reply's "next transmission" symptoms occur only
once. Permanent damage needs three failures on one socket (A4) or
controller removal before any later send (A2, kmemleak).

**A7. "Powered off" must mean actually down.** Right after a controller
is registered it stays up (`HCI_RUNNING`) during the auto power-off
window, even though MGMT already reports it powered off. A Mesh Send in
that window succeeds and really transmits, so there is no leak. This
reproducer powers the controller on and off explicitly and checks
`HCI_UP` first. The reply does not say how the adapter was powered off.

**A8. Details needed to repeat the `-ENODEV` and `-ENOMEM` cases are not
given.** The reply does not say:

* where the test-only delay goes, or for how long;
* how the controller is removed during it;
* how failslab is narrowed to the `hci_cmd_sync_queue()` allocation
  rather than `mgmt_mesh_add()`, which gives a different, harmless
  `-ENOMEM` path.

## Caveats

* Runs used TCG, not KVM, so they are slower and timing-sensitive races
  get less exercise. Every scenario here is sequential except `-ENODEV`,
  which the delay knob makes deterministic.
* The failslab filter also matches allocations made by `printk` inside
  the injected call path; with `verbose` set, the guest console's buffer
  allocation can be failed as well. This affects console output only. The
  Bluetooth result is the same with `verbose=1` and `verbose=2`, and there
  is exactly one forced failure on the Bluetooth path.
* `results/logs/diag-control-first-pass/` holds the first diag run (two
  scans, no shrinking), which first showed the `-ENETDOWN` and `-ENODEV`
  plain-scan misses; `results/logs/probe-diag-control/` holds the runs
  that isolated the cause (stack scanning off, then slab shrinking).

## Reproduce

```sh
# kernel (per build): see kernel/build-kernel.sh and kernel/*.config
./build-repro.sh <bluez-tree>             # builds tools/mesh-leak-check
./run-matrix.sh main control 2            # and: main patched
./run-matrix.sh diag diag-control 2       # and: diag diag-patched
./summarize.py logs control patched
./summarize.py logs diag-control diag-patched
```

Scenarios: `mesh-leak-check <baseline|offline|offline-busy|enomem|enomem-busy|close-reuse|kmemleak-enetdown|kmemleak-enomem|kmemleak-enodev> <legacy|ext> [stackoff,shrink]`.
