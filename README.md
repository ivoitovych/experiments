# Bluetooth MGMT Mesh Send leak: retest

An independent retest of the Linux kernel patch
"Bluetooth: MGMT: fix mesh_tx leak on hci_cmd_sync_queue() failure"
([patchwork 14831271](https://patchwork.kernel.org/patch/14831271/)),
with everything needed to repeat it.

## Why

The patch fixes `mesh_send()` in `net/bluetooth/mgmt.c`: when queueing a
Mesh Send fails, the request's handle was never released. Its author
found the bug by reading the code and had not reproduced it. This
branch reproduces it on bluetooth-next `036d4119079a`, with and without
the patch, and checks what the failure does to later transmissions,
other sockets and kernel memory.

## What is here

| Path | Use it for |
|---|---|
| [`bluetooth/mesh-tx-leak/REPORT.md`](bluetooth/mesh-tx-leak/REPORT.md) | The findings |
| [`bluetooth/mesh-tx-leak/README.md`](bluetooth/mesh-tx-leak/README.md) | Layout and step-by-step reproduction |
| `bluetooth/mesh-tx-leak/mesh-leak-check.c` | The reproducer: drives MGMT Mesh Send against BlueZ's emulated controller |
| `bluetooth/mesh-tx-leak/kernel/` | Kernel config fragments and full configs (KASAN, lockdep, failslab, kmemleak), the patch under test |
| `bluetooth/mesh-tx-leak/results/` | Raw VM console logs for every run, generated summaries, a log audit |

## How it was done

Four kernels built from the same bluetooth-next revision (without the
patch, with it, and kmemleak variants of both), each run in a fresh QEMU
guest with BlueZ's `test-runner` and emulated controller. Failures are
produced by powering the adapter off, by fault injection targeted at the
one allocation that matters, and by removing the controller during a
send. Observations come from the MGMT interface, the commands the
emulated controller receives, and kprobes in the kernel. BlueZ's own
`mgmt-tester` and `mesh-tester` were run on both kernels as well.

## Quick start

On Ubuntu 24.04 with the packages listed in the
[kit README](bluetooth/mesh-tx-leak/README.md):

```sh
# after building BlueZ and the kernels as described there
bluetooth/mesh-tx-leak/build-repro.sh "$BLUEZ"
cd bluetooth/mesh-tx-leak
./run-matrix.sh main control 2
./run-matrix.sh main patched 2
./summarize.py logs control patched
```

## Author

Iaroslav Voitovych <yaroslav.voytovych@gmail.com>
