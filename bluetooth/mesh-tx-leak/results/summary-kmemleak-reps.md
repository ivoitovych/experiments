## diag-control: kmemleak

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

## diag-patched: kmemleak

| Case | Scan | Runs | Request reported | Socket reported | First round |
|---|---|---|---|---|---|
| `-ENETDOWN` | plain, after the reproducer exited | 2 | 0/2 | 0/2 | - |
| `-ENETDOWN` | plain, from the running reproducer | 2 | 0/2 | 0/2 | - |
| `-ENETDOWN` | slab caches shrunk, from the running reproducer | 2 | 0/2 | 0/2 | - |
| `-ENODEV` | plain, after the reproducer exited | 2 | 0/2 | 0/2 | - |
| `-ENODEV` | plain, from the running reproducer | 2 | 0/2 | 0/2 | - |
| `-ENODEV` | slab caches shrunk, from the running reproducer | 2 | 0/2 | 0/2 | - |
| `-ENOMEM` | plain, after the reproducer exited | 2 | 0/2 | 0/2 | - |
| `-ENOMEM` | plain, from the running reproducer | 2 | 0/2 | 0/2 | - |
| `-ENOMEM` | slab caches shrunk, from the running reproducer | 2 | 0/2 | 0/2 | - |

