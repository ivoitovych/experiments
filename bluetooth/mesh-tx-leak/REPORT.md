# Retest: "Bluetooth: MGMT: fix mesh_tx leak on hci_cmd_sync_queue() failure"

Retest of Hui Peng's patch
([patchwork 14831271](https://patchwork.kernel.org/patch/14831271/)) on
bluetooth-next `036d4119079a`. It re-checks a set of test results
reported for the patch (listed below as statements S1–S12) and records
further observations. Reproduction steps are in [README.md](README.md).

**Summary.** Every statement reproduces. That includes the kmemleak
statement, provided kmemleak is scanned after the test program has exited
(see S9). The patched kernel behaves as stated in every case. The
additional observations are about the unpatched kernel:

* the failed request keeps its socket alive;
* it disturbs other sockets' transmissions;
* requests that Mesh Send reported as Failed can still be started on the
  controller later.

## Setup

| Item | Value |
|---|---|
| Kernel base | bluetooth-next `036d4119079a` ("Bluetooth: btusb: add ASUS 0b05:1825 to QCA Rome quirks"), the tree's `master` at test time |
| Patch | patchwork 14831271 mbox, applied with `git am` without conflicts (`kernel/mesh-tx-leak-fix.diff`, mbox sha256 in `kernel/patch-mbox.sha256`) |
| Builds | `control` (base), `patched` (base + patch), `diag-control` (base + test-only delay knob), `diag-patched` (delay knob + patch) |
| Config | `x86_64_defconfig` + BlueZ `doc/tester.config` (KASAN, PROVE_LOCKING, DEBUG_ATOMIC_SLEEP, …) + `kernel/fault.config` (FAILSLAB, fault-injection debugfs, stacktrace filter, KASAN_INLINE). The `diag-*` builds also use `kernel/kmemleak.config` (DEBUG_KMEMLEAK). `control` and `patched` have identical configs, as do the two `diag-*` builds. Full `.config` files are in `kernel/` |
| Toolchain | gcc 13.3.0 (Ubuntu 24.04) |
| VM | QEMU 8.2.2 run by BlueZ `tools/test-runner`, **TCG (no KVM)**, 1024 MB, 1 or 4 vCPUs, a fresh VM per run |
| BlueZ | `7edaa61403390fe1cf2f1fb6d45fdd90fe6e93b3` (master at test time) for `test-runner`, `mgmt-tester`, `mesh-tester` and the emulator code linked into the reproducer |
| Controller | BlueZ's emulated controller (hciemu/btdev over `/dev/vhci`): `BREDRLE` for legacy advertising, `BREDRLE50` for extended advertising |

### Producing the failures

* **`-ENETDOWN`**: LE and the mesh experimental feature on; the
  controller is powered on, then off, with `HCI_UP` checked clear; then
  Mesh Send.
* **`-ENOMEM`**: failslab, limited to the reproducer's thread and to
  allocations whose call stack is inside `mesh_send()` but not inside
  `mgmt_mesh_add()`. One failure is armed per send. The call trace shows
  the injected failure at `hci_cmd_sync_submit()` ← `mesh_send()`
  (`results/logs/*/enomem-trace-legacy-1cpu.log`).
* **`-ENODEV`** (diag builds only): a test-only knob makes `mesh_send()`
  sleep 1500 ms between `mgmt_mesh_add()` and `hci_cmd_sync_queue()`
  (`kernel/test-only-mesh-send-delay.patch`). The emulated controller is
  removed 300 ms into the Mesh Send. Runs without the delay were not
  attempted.

The errno in each run is taken from the kernel's own `Send Mesh Failed %d`
message.

### Measurements

The reproducer only observes and prints `RESULT` lines; it does not judge
them. It records:

* MGMT command statuses, the Read Mesh Features handle list, and Mesh
  Packet Complete events;
* on the emulated controller, the writes of each request's tagged
  advertising data and the advertising enables;
* kprobes on `mgmt_mesh_add` (return), `mesh_send_sync`,
  `mgmt_mesh_remove` (per handle), `hci_release_dev` and
  `hci_sock_destruct`;
* kmemleak scans, five rounds 6 s apart (diag builds).

`summarize.py` puts two builds side by side. `audit-logs.sh` checks every
log for a completed run, the expected kernel commit, and kernel reports.

### Runs

139 VM runs, all in `results/logs/`:

* Each scenario ran **once** per build, advertising type and CPU count:
  two builds × 2 advertising types × 7 scenarios at 1 CPU, plus 2
  scenarios at 4 CPUs.
* mgmt-tester and mesh-tester ran once on each of `control` and
  `patched`.
* The kmemleak cases ran once per advertising type in the diag matrix,
  with plain and with shrink scans. They were then repeated (legacy
  advertising) 5× on `diag-control` and 2× on `diag-patched` for each of
  three scan methods.
* `results/audit.txt` passes for all 139 runs: each guest command
  completed, each kernel banner matches its build, and there are no
  KASAN, lockdep, WARNING, BUG or Oops reports.
* The only non-zero exits are the two mesh-tester runs; mesh-tester
  exits 1 when any of its cases fail (see S12).

## Statements re-checked

| # | Statement | Result | Evidence |
|---|---|---|---|
| S1 | Tested on bluetooth-next `036d4119079a`, patch applied as posted | **Confirmed.** It applies cleanly; the patched kernels boot as `-g59f710c1a4bd` and `-g8ac2a343ce63` | `kernel/`, kernel banners |
| S2 | Reachable without fault injection: a powered-off Mesh Send reaches `hci_cmd_sync_queue()`, which returns `-ENETDOWN` after the request has been given a handle | **Confirmed.** `Send Mesh Failed -100`; the `mgmt_mesh_add` kprobe shows handle 1 assigned | `*/offline-*` |
| S3 | `-ENOMEM` via failslab | **Confirmed.** `Send Mesh Failed -12`, injected in `hci_cmd_sync_submit()` | `*/enomem-*` |
| S4 | Unpatched: the failed handle stays listed in Read Mesh Features | **Confirmed** for both errnos, both advertising types | `after_failure outstanding=1 handles=1` |
| S5 | Unpatched: when the next transmission ends, Mesh Packet Complete is reported for the failed handle, and the next request's packet is started on the controller twice | **Confirmed.** One accepted send yields completions `1,2`, and `mesh_send_sync` runs twice for handle 2. On the controller: 2 advertising enables (legacy), or 2 writes of the request's data plus 2 enables (extended). The patched kernel shows one of each | `summary-main.md` |
| S6 | Three consecutive failures leave three handles outstanding; further Mesh Sends from that socket get Busy | **Confirmed**, including after the adapter is powered on again. See O3 for what clears it | `*/offline-busy-*`, `*/enomem-busy-*` |
| S7 | Patched: no failed handle listed or completed; each accepted send started and completed once; repeated failures leave no outstanding handles | **Confirmed** in every patched run. After three failures the next accepted send succeeds: the 4th send in `enomem-busy`; in `offline-busy` the 5th, because the 4th is still sent while powered off and fails with `-ENETDOWN` | `summary-main.md` |
| S8 | The powered-off reproducer gives the same control-vs-patched result on a 4-CPU guest | **Confirmed**, and also for `-ENOMEM` at 4 CPUs | `*-4cpu.log` |
| S9 | With kmemleak, after the socket is closed and the controller removed, leaked `mgmt_mesh_add()` allocations are reported on the unpatched build only, for `-ENETDOWN`, `-ENOMEM` and `-ENODEV` | **Confirmed, depending on when kmemleak scans.** Plain scans after the test program has exited report the request in 5/5 runs for each errno; the patched build reports nothing. Plain scans from inside the still-running program miss `-ENETDOWN` and `-ENODEV` (0/5) | table below |
| S10 | The `-ENODEV` case used a test-only delay in `mesh_send()`, in diagnostic builds of both kernels | **Consistent.** With the delay, `Send Mesh Failed -19` in every run | `*/kmemleak-enodev-*`, `reps-*/enodev-*` |
| S11 | No KASAN, lockdep or WARNING reports | **Confirmed** on all four builds, all 139 runs | `results/audit.txt` |
| S12 | Unmodified mgmt-tester and mesh-tester give identical per-case results with and without the patch | **Confirmed.** mgmt-tester: 503/503 on both. mesh-tester: 8/10 on both; "Mesh - Send cancel - 1" and "Mesh - Send cancel - 2" time out on both kernels | `summary-main.md` |

### kmemleak scan method (S9)

Each repeated run fails one Mesh Send, closes the socket, removes the
controller, then scans kmemleak five times, 6 s apart.

| Case | Scan | Runs | Request reported | Socket reported | First round |
|---|---|---|---|---|---|
| `-ENETDOWN` | plain, after the reproducer exited | 5 | 5/5 | 0/5 | 2 |
| `-ENETDOWN` | plain, from the running reproducer | 5 | 0/5 | 0/5 | - |
| `-ENETDOWN` | slab caches shrunk, from the running reproducer | 5 | 5/5 | 5/5 | 2 |
| `-ENODEV` | plain, after the reproducer exited | 5 | 5/5 | 0/5 | 2 |
| `-ENODEV` | plain, from the running reproducer | 5 | 0/5 | 0/5 | - |
| `-ENODEV` | slab caches shrunk, from the running reproducer | 5 | 5/5 | 0/5 | 3 |
| `-ENOMEM` | plain, after the reproducer exited | 5 | 5/5 | 5/5 | 2 |
| `-ENOMEM` | plain, from the running reproducer | 5 | 5/5 | 5/5 | 2 |
| `-ENOMEM` | slab caches shrunk, from the running reproducer | 5 | 5/5 | 5/5 | 2 |

* **diag-patched:** 0 reports in every case and method (2 runs each).
* **The kprobes agree with kmemleak:** on `diag-control` the failed
  request is never removed (`mgmt_mesh_remove` does not fire for it) and
  the MGMT socket is never destroyed. On `diag-patched` the request is
  removed on the failure path and the socket is destroyed when closed.
* **Why scans from the running program miss two cases:** the leaked
  objects are evidently still referenced from memory that kmemleak scans.
  Task-stack scanning is not the cause: turning it off changes nothing
  (`results/logs/probe-diag-control/`). Both process exit and shrinking
  the slab caches make the leak visible. That fits stale pointers in
  SLUB's per-CPU sheaves: sheaves are kmalloc'd, so kmemleak tracks and
  scans them, and allocating an object does not clear its slot. Both
  process exit (many frees) and shrinking overwrite or free those slots.
  This explanation is inferred from the behaviour, not traced to the
  referencing slot.
* `results/logs/diag-control-first-pass/` holds the first, in-process
  scans that raised the question.

## Additional observations (unpatched kernel)

**O1. The failed request keeps its socket alive.** `mgmt_mesh_add()`
takes a reference on the MGMT socket (`sock_hold`). Pending requests are
cleaned up only in the socket's destructor (`hci_sock_destruct()` →
`mgmt_cleanup()`), which cannot run while that reference is held. So
closing the socket does not free the failed request:

* `hci_sock_destruct` never fires for the MGMT socket on the unpatched
  builds, and fires on the patched ones;
* when kmemleak reports the request, it often reports the socket object
  too (`sk_prot_alloc` ← `hci_sock_create`, plus its LSM blob; table
  above).

The patch's commit message says the entry "is only released when the
socket is closed or the controller goes away". For the failed request,
neither happens: S9 is measured after both.

**O2. The stale entry disturbs other sockets (`close-reuse-*`).** Socket A
fails a Mesh Send while powered off and is closed. Socket B powers the
controller on and sends. B then receives Mesh Packet Complete for A's
handle, and B's own packet is started twice. Completion and scheduling
take the first pending entry on the controller, from any socket.

**O3. Another socket's traffic clears Busy, and starts the failed
requests (`busy-drain-*`).** Socket A reaches Busy after three
powered-off failures (handles 1–3) and stays Busy after power-on. Then
socket B sends once, and B's transmission works through all three of A's
entries:

* handle 1 is reported complete, without ever having been started;
* handles 2 and 3 are **started**: `mesh_send_sync` runs for each, and
  their advertising data reaches the emulated controller, although Mesh
  Send had answered Failed for both;
* B's packet is then started a second time.

After that, A has no outstanding handles and can send again. With one
failure only the "completion" happens. With two or more, the requests
queued behind the first are transmitted. The patched kernel starts none
of A's failed requests. Results are the same for legacy and extended
advertising.

**O4. One failure is undone by the next transmission on the controller,
from any socket.** That is why the S5 symptoms appear once. A socket that
reaches Busy (S6) stays Busy until another socket transmits (O3). A
failure followed by socket close and controller removal stays leaked
(S9, O1).

**O5. "Powered off" must mean actually down.** Right after registration,
a controller stays up (`HCI_RUNNING`) during its auto power-off window,
although MGMT already reports it powered off. A Mesh Send in that window
succeeds and transmits, so nothing leaks. The reproducer powers the
controller on and off explicitly and checks `HCI_UP` before sending.

**O6. Repeating the `-ENOMEM` and `-ENODEV` cases needs details not
covered by S1–S12:**

* how failslab is confined to the `hci_cmd_sync_queue()` allocation
  rather than `mgmt_mesh_add()`, which gives a different, harmless
  `-ENOMEM` path;
* where the test-only delay goes, how long it is, and how the controller
  is removed during it;
* when kmemleak is scanned (S9);
* the BlueZ revision (S12).

This directory contains all of them.

## Caveats

* The runs used TCG, not KVM, so they are slower and real races get less
  exercise. All scenarios are sequential, except `-ENODEV`, which the
  delay makes deterministic.
* Each functional scenario ran once per configuration. The results are
  identical across advertising types and CPU counts, but they are not
  repeated runs; only the kmemleak cases were repeated.
* The failslab filter also matches allocations made by `printk` inside
  the injected call path. With `verbose` set, the guest console's buffer
  allocation can be failed too. This only affects console output; the
  Bluetooth result is identical with `verbose=1` and `verbose=2`.
* Script versions:
  * Until `c41ce63`, `run-vm.sh` and `build-kernel.sh` did not propagate
    failures. `audit-logs.sh` was added then and covers all runs,
    including the earlier ones.
  * The reproducer gained diagnostics over time. `control` and `patched`
    ran the same binary for the main matrix; the two `diag` builds ran
    the same binary as each other.
  * The control image now on disk was rebuilt once from identical source
    when testing `build-kernel.sh`; the logs come from the first build.
