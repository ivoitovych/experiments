# Results: `control` vs `patched`

## baseline-ext-1cpu

| control | patched |
|---|---|
| `Mesh Send tag 1 -> Success handle 1` | `Mesh Send tag 1 -> Success handle 1` |
| `Mesh Send tag 2 -> Success handle 2` | `Mesh Send tag 2 -> Success handle 2` |
| `after outstanding=0 handles=-` | `after outstanding=0 handles=-` |
| `after sockA packet_complete_handles=1,2` | `after sockA packet_complete_handles=1,2` |
| `after hci tag=1 adv_data_writes=1` | `after hci tag=1 adv_data_writes=1` |
| `after hci tag=2 adv_data_writes=1` | `after hci tag=2 adv_data_writes=1` |
| `after hci adv_enable=2 adv_disable=2` | `after hci adv_enable=2 adv_disable=2` |
| `after kprobe handle=1 added=1 mesh_send_sync=1 removed=1` | `after kprobe handle=1 added=1 mesh_send_sync=1 removed=1` |
| `after kprobe handle=2 added=1 mesh_send_sync=1 removed=1` | `after kprobe handle=2 added=1 mesh_send_sync=1 removed=1` |

control kernel reports: 0

patched kernel reports: 0

## baseline-legacy-1cpu

| control | patched |
|---|---|
| `Mesh Send tag 1 -> Success handle 1` | `Mesh Send tag 1 -> Success handle 1` |
| `Mesh Send tag 2 -> Success handle 2` | `Mesh Send tag 2 -> Success handle 2` |
| `after outstanding=0 handles=-` | `after outstanding=0 handles=-` |
| `after sockA packet_complete_handles=1,2` | `after sockA packet_complete_handles=1,2` |
| `after hci tag=1 adv_data_writes=1` | `after hci tag=1 adv_data_writes=1` |
| `after hci tag=2 adv_data_writes=1` | `after hci tag=2 adv_data_writes=1` |
| `after hci adv_enable=2 adv_disable=1` | `after hci adv_enable=2 adv_disable=1` |
| `after kprobe handle=1 added=1 mesh_send_sync=1 removed=1` | `after kprobe handle=1 added=1 mesh_send_sync=1 removed=1` |
| `after kprobe handle=2 added=1 mesh_send_sync=1 removed=1` | `after kprobe handle=2 added=1 mesh_send_sync=1 removed=1` |

control kernel reports: 0

patched kernel reports: 0

## close-reuse-ext-1cpu

| control | patched |
|---|---|
| `dmesg: Bluetooth: hci0: Send Mesh Failed -100` | `dmesg: Bluetooth: hci0: Send Mesh Failed -100` |
| `Mesh Send tag 1 -> Failed (0x03)` | `Mesh Send tag 1 -> Failed (0x03)` |
| `sockA_after_failure outstanding=1 handles=1` | `sockA_after_failure outstanding=0 handles=-` **≠** |
| `Mesh Send tag 2 -> Success handle 2` | `Mesh Send tag 2 -> Success handle 2` |
| `sockB_after_send outstanding=0 handles=-` | `sockB_after_send outstanding=0 handles=-` |
| `sockB sockB packet_complete_handles=1,2` | `sockB sockB packet_complete_handles=2` **≠** |
| `sockB hci tag=1 adv_data_writes=0` | `sockB hci tag=1 adv_data_writes=0` |
| `sockB hci tag=2 adv_data_writes=2` | `sockB hci tag=2 adv_data_writes=1` **≠** |
| `sockB hci adv_enable=2 adv_disable=2` | `sockB hci adv_enable=1 adv_disable=1` **≠** |
| `sockB kprobe handle=1 added=1 mesh_send_sync=0 removed=1` | `sockB kprobe handle=1 added=1 mesh_send_sync=0 removed=1` |
| `sockB kprobe handle=2 added=1 mesh_send_sync=2 removed=1` | `sockB kprobe handle=2 added=1 mesh_send_sync=1 removed=1` **≠** |

control kernel reports: 0

patched kernel reports: 0

## close-reuse-legacy-1cpu

| control | patched |
|---|---|
| `dmesg: Bluetooth: hci0: Send Mesh Failed -100` | `dmesg: Bluetooth: hci0: Send Mesh Failed -100` |
| `Mesh Send tag 1 -> Failed (0x03)` | `Mesh Send tag 1 -> Failed (0x03)` |
| `sockA_after_failure outstanding=1 handles=1` | `sockA_after_failure outstanding=0 handles=-` **≠** |
| `Mesh Send tag 2 -> Success handle 2` | `Mesh Send tag 2 -> Success handle 2` |
| `sockB_after_send outstanding=0 handles=-` | `sockB_after_send outstanding=0 handles=-` |
| `sockB sockB packet_complete_handles=1,2` | `sockB sockB packet_complete_handles=2` **≠** |
| `sockB hci tag=1 adv_data_writes=0` | `sockB hci tag=1 adv_data_writes=0` |
| `sockB hci tag=2 adv_data_writes=1` | `sockB hci tag=2 adv_data_writes=1` |
| `sockB hci adv_enable=2 adv_disable=1` | `sockB hci adv_enable=1 adv_disable=0` **≠** |
| `sockB kprobe handle=1 added=1 mesh_send_sync=0 removed=1` | `sockB kprobe handle=1 added=1 mesh_send_sync=0 removed=1` |
| `sockB kprobe handle=2 added=1 mesh_send_sync=2 removed=1` | `sockB kprobe handle=2 added=1 mesh_send_sync=1 removed=1` **≠** |

control kernel reports: 0

patched kernel reports: 0

## enomem-busy-ext-1cpu

| control | patched |
|---|---|
| `dmesg: Bluetooth: hci0: Send Mesh Failed -12` | `dmesg: Bluetooth: hci0: Send Mesh Failed -12` |
| `Mesh Send tag 1 -> Failed (0x03)` | `Mesh Send tag 1 -> Failed (0x03)` |
| `dmesg: Bluetooth: hci0: Send Mesh Failed -12` | `dmesg: Bluetooth: hci0: Send Mesh Failed -12` |
| `Mesh Send tag 2 -> Failed (0x03)` | `Mesh Send tag 2 -> Failed (0x03)` |
| `dmesg: Bluetooth: hci0: Send Mesh Failed -12` | `dmesg: Bluetooth: hci0: Send Mesh Failed -12` |
| `Mesh Send tag 3 -> Failed (0x03)` | `Mesh Send tag 3 -> Failed (0x03)` |
| `after_3_failures outstanding=3 handles=1,2,3` | `after_3_failures outstanding=0 handles=-` **≠** |
| `Mesh Send tag 4 -> Busy (0x0a)` | `Mesh Send tag 4 -> Success handle 4` **≠** |
| `fourth_send status=Busy` | `fourth_send status=Success` **≠** |
| `end outstanding=3 handles=1,2,3` | `end outstanding=0 handles=-` **≠** |
| `end sockA packet_complete_handles=-` | `end sockA packet_complete_handles=4` **≠** |
| `end kprobe handle=1 added=1 mesh_send_sync=0 removed=0` | `end kprobe handle=1 added=1 mesh_send_sync=0 removed=1` **≠** |
| `end kprobe handle=2 added=1 mesh_send_sync=0 removed=0` | `end kprobe handle=2 added=1 mesh_send_sync=0 removed=1` **≠** |
| `end kprobe handle=3 added=1 mesh_send_sync=0 removed=0` | `end kprobe handle=3 added=1 mesh_send_sync=0 removed=1` **≠** |
| `` | `end kprobe handle=4 added=1 mesh_send_sync=1 removed=1` **≠** |

control kernel reports: 0

patched kernel reports: 0

## enomem-busy-legacy-1cpu

| control | patched |
|---|---|
| `dmesg: Bluetooth: hci0: Send Mesh Failed -12` | `dmesg: Bluetooth: hci0: Send Mesh Failed -12` |
| `Mesh Send tag 1 -> Failed (0x03)` | `Mesh Send tag 1 -> Failed (0x03)` |
| `dmesg: Bluetooth: hci0: Send Mesh Failed -12` | `dmesg: Bluetooth: hci0: Send Mesh Failed -12` |
| `Mesh Send tag 2 -> Failed (0x03)` | `Mesh Send tag 2 -> Failed (0x03)` |
| `dmesg: Bluetooth: hci0: Send Mesh Failed -12` | `dmesg: Bluetooth: hci0: Send Mesh Failed -12` |
| `Mesh Send tag 3 -> Failed (0x03)` | `Mesh Send tag 3 -> Failed (0x03)` |
| `after_3_failures outstanding=3 handles=1,2,3` | `after_3_failures outstanding=0 handles=-` **≠** |
| `Mesh Send tag 4 -> Busy (0x0a)` | `Mesh Send tag 4 -> Success handle 4` **≠** |
| `fourth_send status=Busy` | `fourth_send status=Success` **≠** |
| `end outstanding=3 handles=1,2,3` | `end outstanding=0 handles=-` **≠** |
| `end sockA packet_complete_handles=-` | `end sockA packet_complete_handles=4` **≠** |
| `end kprobe handle=1 added=1 mesh_send_sync=0 removed=0` | `end kprobe handle=1 added=1 mesh_send_sync=0 removed=1` **≠** |
| `end kprobe handle=2 added=1 mesh_send_sync=0 removed=0` | `end kprobe handle=2 added=1 mesh_send_sync=0 removed=1` **≠** |
| `end kprobe handle=3 added=1 mesh_send_sync=0 removed=0` | `end kprobe handle=3 added=1 mesh_send_sync=0 removed=1` **≠** |
| `` | `end kprobe handle=4 added=1 mesh_send_sync=1 removed=1` **≠** |

control kernel reports: 0

patched kernel reports: 0

## enomem-ext-1cpu

| control | patched |
|---|---|
| `dmesg: Bluetooth: hci0: Send Mesh Failed -12` | `dmesg: Bluetooth: hci0: Send Mesh Failed -12` |
| `Mesh Send tag 1 -> Failed (0x03)` | `Mesh Send tag 1 -> Failed (0x03)` |
| `after_failure outstanding=1 handles=1` | `after_failure outstanding=0 handles=-` **≠** |
| `Mesh Send tag 2 -> Success handle 2` | `Mesh Send tag 2 -> Success handle 2` |
| `after_next outstanding=0 handles=-` | `after_next outstanding=0 handles=-` |
| `after_next sockA packet_complete_handles=1,2` | `after_next sockA packet_complete_handles=2` **≠** |
| `after_next hci tag=1 adv_data_writes=0` | `after_next hci tag=1 adv_data_writes=0` |
| `after_next hci tag=2 adv_data_writes=2` | `after_next hci tag=2 adv_data_writes=1` **≠** |
| `after_next hci adv_enable=2 adv_disable=2` | `after_next hci adv_enable=1 adv_disable=1` **≠** |
| `after_next kprobe handle=1 added=1 mesh_send_sync=0 removed=1` | `after_next kprobe handle=1 added=1 mesh_send_sync=0 removed=1` |
| `after_next kprobe handle=2 added=1 mesh_send_sync=2 removed=1` | `after_next kprobe handle=2 added=1 mesh_send_sync=1 removed=1` **≠** |

control kernel reports: 0

patched kernel reports: 0

## enomem-ext-4cpu

| control | patched |
|---|---|
| `dmesg: Bluetooth: hci0: Send Mesh Failed -12` | `dmesg: Bluetooth: hci0: Send Mesh Failed -12` |
| `Mesh Send tag 1 -> Failed (0x03)` | `Mesh Send tag 1 -> Failed (0x03)` |
| `after_failure outstanding=1 handles=1` | `after_failure outstanding=0 handles=-` **≠** |
| `Mesh Send tag 2 -> Success handle 2` | `Mesh Send tag 2 -> Success handle 2` |
| `after_next outstanding=0 handles=-` | `after_next outstanding=0 handles=-` |
| `after_next sockA packet_complete_handles=1,2` | `after_next sockA packet_complete_handles=2` **≠** |
| `after_next hci tag=1 adv_data_writes=0` | `after_next hci tag=1 adv_data_writes=0` |
| `after_next hci tag=2 adv_data_writes=2` | `after_next hci tag=2 adv_data_writes=1` **≠** |
| `after_next hci adv_enable=2 adv_disable=2` | `after_next hci adv_enable=1 adv_disable=1` **≠** |
| `after_next kprobe handle=1 added=1 mesh_send_sync=0 removed=1` | `after_next kprobe handle=1 added=1 mesh_send_sync=0 removed=1` |
| `after_next kprobe handle=2 added=1 mesh_send_sync=2 removed=1` | `after_next kprobe handle=2 added=1 mesh_send_sync=1 removed=1` **≠** |

control kernel reports: 0

patched kernel reports: 0

## enomem-legacy-1cpu

| control | patched |
|---|---|
| `dmesg: Bluetooth: hci0: Send Mesh Failed -12` | `dmesg: Bluetooth: hci0: Send Mesh Failed -12` |
| `Mesh Send tag 1 -> Failed (0x03)` | `Mesh Send tag 1 -> Failed (0x03)` |
| `after_failure outstanding=1 handles=1` | `after_failure outstanding=0 handles=-` **≠** |
| `Mesh Send tag 2 -> Success handle 2` | `Mesh Send tag 2 -> Success handle 2` |
| `after_next outstanding=0 handles=-` | `after_next outstanding=0 handles=-` |
| `after_next sockA packet_complete_handles=1,2` | `after_next sockA packet_complete_handles=2` **≠** |
| `after_next hci tag=1 adv_data_writes=0` | `after_next hci tag=1 adv_data_writes=0` |
| `after_next hci tag=2 adv_data_writes=1` | `after_next hci tag=2 adv_data_writes=1` |
| `after_next hci adv_enable=2 adv_disable=1` | `after_next hci adv_enable=1 adv_disable=0` **≠** |
| `after_next kprobe handle=1 added=1 mesh_send_sync=0 removed=1` | `after_next kprobe handle=1 added=1 mesh_send_sync=0 removed=1` |
| `after_next kprobe handle=2 added=1 mesh_send_sync=2 removed=1` | `after_next kprobe handle=2 added=1 mesh_send_sync=1 removed=1` **≠** |

control kernel reports: 0

patched kernel reports: 0

## enomem-legacy-4cpu

| control | patched |
|---|---|
| `dmesg: Bluetooth: hci0: Send Mesh Failed -12` | `dmesg: Bluetooth: hci0: Send Mesh Failed -12` |
| `Mesh Send tag 1 -> Failed (0x03)` | `Mesh Send tag 1 -> Failed (0x03)` |
| `after_failure outstanding=1 handles=1` | `after_failure outstanding=0 handles=-` **≠** |
| `Mesh Send tag 2 -> Success handle 2` | `Mesh Send tag 2 -> Success handle 2` |
| `after_next outstanding=0 handles=-` | `after_next outstanding=0 handles=-` |
| `after_next sockA packet_complete_handles=1,2` | `after_next sockA packet_complete_handles=2` **≠** |
| `after_next hci tag=1 adv_data_writes=0` | `after_next hci tag=1 adv_data_writes=0` |
| `after_next hci tag=2 adv_data_writes=1` | `after_next hci tag=2 adv_data_writes=1` |
| `after_next hci adv_enable=2 adv_disable=1` | `after_next hci adv_enable=1 adv_disable=0` **≠** |
| `after_next kprobe handle=1 added=1 mesh_send_sync=0 removed=1` | `after_next kprobe handle=1 added=1 mesh_send_sync=0 removed=1` |
| `after_next kprobe handle=2 added=1 mesh_send_sync=2 removed=1` | `after_next kprobe handle=2 added=1 mesh_send_sync=1 removed=1` **≠** |

control kernel reports: 0

patched kernel reports: 0

## enomem-trace-legacy-1cpu

| control | patched |
|---|---|
| `dmesg: Bluetooth: hci0: Send Mesh Failed -12` | `dmesg: Bluetooth: hci0: Send Mesh Failed -12` |
| `Mesh Send tag 1 -> Failed (0x03)` | `Mesh Send tag 1 -> Failed (0x03)` |
| `after_failure outstanding=1 handles=1` | `after_failure outstanding=0 handles=-` **≠** |
| `Mesh Send tag 2 -> Success handle 2` | `Mesh Send tag 2 -> Success handle 2` |
| `after_next outstanding=0 handles=-` | `after_next outstanding=0 handles=-` |
| `after_next sockA packet_complete_handles=1,2` | `after_next sockA packet_complete_handles=2` **≠** |
| `after_next hci tag=1 adv_data_writes=0` | `after_next hci tag=1 adv_data_writes=0` |
| `after_next hci tag=2 adv_data_writes=1` | `after_next hci tag=2 adv_data_writes=1` |
| `after_next hci adv_enable=2 adv_disable=1` | `after_next hci adv_enable=1 adv_disable=0` **≠** |
| `after_next kprobe handle=1 added=1 mesh_send_sync=0 removed=1` | `after_next kprobe handle=1 added=1 mesh_send_sync=0 removed=1` |
| `after_next kprobe handle=2 added=1 mesh_send_sync=2 removed=1` | `after_next kprobe handle=2 added=1 mesh_send_sync=1 removed=1` **≠** |

control kernel reports: 0

patched kernel reports: 0

## mesh-tester-1cpu

- control: Total: 10, Passed: 8 (80.0%), Failed: 2, Not Run: 0
- patched: Total: 10, Passed: 8 (80.0%), Failed: 2, Not Run: 0
- per-case differences: 0
- not passing: Mesh - Send cancel - 1: control=Timed out patched=Timed out
- not passing: Mesh - Send cancel - 2: control=Timed out patched=Timed out

control kernel reports: 0

patched kernel reports: 0

## mgmt-tester-1cpu

- control: Total: 503, Passed: 503 (100.0%), Failed: 0, Not Run: 0
- patched: Total: 503, Passed: 503 (100.0%), Failed: 0, Not Run: 0
- per-case differences: 0

control kernel reports: 0

patched kernel reports: 0

## offline-busy-ext-1cpu

| control | patched |
|---|---|
| `dmesg: Bluetooth: hci0: Send Mesh Failed -100` | `dmesg: Bluetooth: hci0: Send Mesh Failed -100` |
| `Mesh Send tag 1 -> Failed (0x03)` | `Mesh Send tag 1 -> Failed (0x03)` |
| `dmesg: Bluetooth: hci0: Send Mesh Failed -100` | `dmesg: Bluetooth: hci0: Send Mesh Failed -100` |
| `Mesh Send tag 2 -> Failed (0x03)` | `Mesh Send tag 2 -> Failed (0x03)` |
| `dmesg: Bluetooth: hci0: Send Mesh Failed -100` | `dmesg: Bluetooth: hci0: Send Mesh Failed -100` |
| `Mesh Send tag 3 -> Failed (0x03)` | `Mesh Send tag 3 -> Failed (0x03)` |
| `after_3_failures outstanding=3 handles=1,2,3` | `after_3_failures outstanding=0 handles=-` **≠** |
| `Mesh Send tag 4 -> Busy (0x0a)` | `dmesg: Bluetooth: hci0: Send Mesh Failed -100` **≠** |
| `fourth_send_offline status=Busy` | `Mesh Send tag 4 -> Failed (0x03)` **≠** |
| `Mesh Send tag 5 -> Busy (0x0a)` | `fourth_send_offline status=Failed` **≠** |
| `fifth_send_powered status=Busy` | `Mesh Send tag 5 -> Success handle 5` **≠** |
| `end outstanding=3 handles=1,2,3` | `fifth_send_powered status=Success` **≠** |
| `end sockA packet_complete_handles=-` | `end outstanding=0 handles=-` **≠** |
| `end kprobe handle=1 added=1 mesh_send_sync=0 removed=0` | `end sockA packet_complete_handles=5` **≠** |
| `end kprobe handle=2 added=1 mesh_send_sync=0 removed=0` | `end kprobe handle=1 added=1 mesh_send_sync=0 removed=1` **≠** |
| `end kprobe handle=3 added=1 mesh_send_sync=0 removed=0` | `end kprobe handle=2 added=1 mesh_send_sync=0 removed=1` **≠** |
| `` | `end kprobe handle=3 added=1 mesh_send_sync=0 removed=1` **≠** |
| `` | `end kprobe handle=4 added=1 mesh_send_sync=0 removed=1` **≠** |
| `` | `end kprobe handle=5 added=1 mesh_send_sync=1 removed=1` **≠** |

control kernel reports: 0

patched kernel reports: 0

## offline-busy-legacy-1cpu

| control | patched |
|---|---|
| `dmesg: Bluetooth: hci0: Send Mesh Failed -100` | `dmesg: Bluetooth: hci0: Send Mesh Failed -100` |
| `Mesh Send tag 1 -> Failed (0x03)` | `Mesh Send tag 1 -> Failed (0x03)` |
| `dmesg: Bluetooth: hci0: Send Mesh Failed -100` | `dmesg: Bluetooth: hci0: Send Mesh Failed -100` |
| `Mesh Send tag 2 -> Failed (0x03)` | `Mesh Send tag 2 -> Failed (0x03)` |
| `dmesg: Bluetooth: hci0: Send Mesh Failed -100` | `dmesg: Bluetooth: hci0: Send Mesh Failed -100` |
| `Mesh Send tag 3 -> Failed (0x03)` | `Mesh Send tag 3 -> Failed (0x03)` |
| `after_3_failures outstanding=3 handles=1,2,3` | `after_3_failures outstanding=0 handles=-` **≠** |
| `Mesh Send tag 4 -> Busy (0x0a)` | `dmesg: Bluetooth: hci0: Send Mesh Failed -100` **≠** |
| `fourth_send_offline status=Busy` | `Mesh Send tag 4 -> Failed (0x03)` **≠** |
| `Mesh Send tag 5 -> Busy (0x0a)` | `fourth_send_offline status=Failed` **≠** |
| `fifth_send_powered status=Busy` | `Mesh Send tag 5 -> Success handle 5` **≠** |
| `end outstanding=3 handles=1,2,3` | `fifth_send_powered status=Success` **≠** |
| `end sockA packet_complete_handles=-` | `end outstanding=0 handles=-` **≠** |
| `end kprobe handle=1 added=1 mesh_send_sync=0 removed=0` | `end sockA packet_complete_handles=5` **≠** |
| `end kprobe handle=2 added=1 mesh_send_sync=0 removed=0` | `end kprobe handle=1 added=1 mesh_send_sync=0 removed=1` **≠** |
| `end kprobe handle=3 added=1 mesh_send_sync=0 removed=0` | `end kprobe handle=2 added=1 mesh_send_sync=0 removed=1` **≠** |
| `` | `end kprobe handle=3 added=1 mesh_send_sync=0 removed=1` **≠** |
| `` | `end kprobe handle=4 added=1 mesh_send_sync=0 removed=1` **≠** |
| `` | `end kprobe handle=5 added=1 mesh_send_sync=1 removed=1` **≠** |

control kernel reports: 0

patched kernel reports: 0

## offline-ext-1cpu

| control | patched |
|---|---|
| `dmesg: Bluetooth: hci0: Send Mesh Failed -100` | `dmesg: Bluetooth: hci0: Send Mesh Failed -100` |
| `Mesh Send tag 1 -> Failed (0x03)` | `Mesh Send tag 1 -> Failed (0x03)` |
| `after_failure outstanding=1 handles=1` | `after_failure outstanding=0 handles=-` **≠** |
| `Mesh Send tag 2 -> Success handle 2` | `Mesh Send tag 2 -> Success handle 2` |
| `after_next outstanding=0 handles=-` | `after_next outstanding=0 handles=-` |
| `after_next sockA packet_complete_handles=1,2` | `after_next sockA packet_complete_handles=2` **≠** |
| `after_next hci tag=1 adv_data_writes=0` | `after_next hci tag=1 adv_data_writes=0` |
| `after_next hci tag=2 adv_data_writes=2` | `after_next hci tag=2 adv_data_writes=1` **≠** |
| `after_next hci adv_enable=2 adv_disable=2` | `after_next hci adv_enable=1 adv_disable=1` **≠** |
| `after_next kprobe handle=1 added=1 mesh_send_sync=0 removed=1` | `after_next kprobe handle=1 added=1 mesh_send_sync=0 removed=1` |
| `after_next kprobe handle=2 added=1 mesh_send_sync=2 removed=1` | `after_next kprobe handle=2 added=1 mesh_send_sync=1 removed=1` **≠** |

control kernel reports: 0

patched kernel reports: 0

## offline-ext-4cpu

| control | patched |
|---|---|
| `dmesg: Bluetooth: hci0: Send Mesh Failed -100` | `dmesg: Bluetooth: hci0: Send Mesh Failed -100` |
| `Mesh Send tag 1 -> Failed (0x03)` | `Mesh Send tag 1 -> Failed (0x03)` |
| `after_failure outstanding=1 handles=1` | `after_failure outstanding=0 handles=-` **≠** |
| `Mesh Send tag 2 -> Success handle 2` | `Mesh Send tag 2 -> Success handle 2` |
| `after_next outstanding=0 handles=-` | `after_next outstanding=0 handles=-` |
| `after_next sockA packet_complete_handles=1,2` | `after_next sockA packet_complete_handles=2` **≠** |
| `after_next hci tag=1 adv_data_writes=0` | `after_next hci tag=1 adv_data_writes=0` |
| `after_next hci tag=2 adv_data_writes=2` | `after_next hci tag=2 adv_data_writes=1` **≠** |
| `after_next hci adv_enable=2 adv_disable=2` | `after_next hci adv_enable=1 adv_disable=1` **≠** |
| `after_next kprobe handle=1 added=1 mesh_send_sync=0 removed=1` | `after_next kprobe handle=1 added=1 mesh_send_sync=0 removed=1` |
| `after_next kprobe handle=2 added=1 mesh_send_sync=2 removed=1` | `after_next kprobe handle=2 added=1 mesh_send_sync=1 removed=1` **≠** |

control kernel reports: 0

patched kernel reports: 0

## offline-legacy-1cpu

| control | patched |
|---|---|
| `dmesg: Bluetooth: hci0: Send Mesh Failed -100` | `dmesg: Bluetooth: hci0: Send Mesh Failed -100` |
| `Mesh Send tag 1 -> Failed (0x03)` | `Mesh Send tag 1 -> Failed (0x03)` |
| `after_failure outstanding=1 handles=1` | `after_failure outstanding=0 handles=-` **≠** |
| `Mesh Send tag 2 -> Success handle 2` | `Mesh Send tag 2 -> Success handle 2` |
| `after_next outstanding=0 handles=-` | `after_next outstanding=0 handles=-` |
| `after_next sockA packet_complete_handles=1,2` | `after_next sockA packet_complete_handles=2` **≠** |
| `after_next hci tag=1 adv_data_writes=0` | `after_next hci tag=1 adv_data_writes=0` |
| `after_next hci tag=2 adv_data_writes=1` | `after_next hci tag=2 adv_data_writes=1` |
| `after_next hci adv_enable=2 adv_disable=1` | `after_next hci adv_enable=1 adv_disable=0` **≠** |
| `after_next kprobe handle=1 added=1 mesh_send_sync=0 removed=1` | `after_next kprobe handle=1 added=1 mesh_send_sync=0 removed=1` |
| `after_next kprobe handle=2 added=1 mesh_send_sync=2 removed=1` | `after_next kprobe handle=2 added=1 mesh_send_sync=1 removed=1` **≠** |

control kernel reports: 0

patched kernel reports: 0

## offline-legacy-4cpu

| control | patched |
|---|---|
| `dmesg: Bluetooth: hci0: Send Mesh Failed -100` | `dmesg: Bluetooth: hci0: Send Mesh Failed -100` |
| `Mesh Send tag 1 -> Failed (0x03)` | `Mesh Send tag 1 -> Failed (0x03)` |
| `after_failure outstanding=1 handles=1` | `after_failure outstanding=0 handles=-` **≠** |
| `Mesh Send tag 2 -> Success handle 2` | `Mesh Send tag 2 -> Success handle 2` |
| `after_next outstanding=0 handles=-` | `after_next outstanding=0 handles=-` |
| `after_next sockA packet_complete_handles=1,2` | `after_next sockA packet_complete_handles=2` **≠** |
| `after_next hci tag=1 adv_data_writes=0` | `after_next hci tag=1 adv_data_writes=0` |
| `after_next hci tag=2 adv_data_writes=1` | `after_next hci tag=2 adv_data_writes=1` |
| `after_next hci adv_enable=2 adv_disable=1` | `after_next hci adv_enable=1 adv_disable=0` **≠** |
| `after_next kprobe handle=1 added=1 mesh_send_sync=0 removed=1` | `after_next kprobe handle=1 added=1 mesh_send_sync=0 removed=1` |
| `after_next kprobe handle=2 added=1 mesh_send_sync=2 removed=1` | `after_next kprobe handle=2 added=1 mesh_send_sync=1 removed=1` **≠** |

control kernel reports: 0

patched kernel reports: 0

