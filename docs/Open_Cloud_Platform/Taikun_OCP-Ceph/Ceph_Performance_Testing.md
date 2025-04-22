# **Ceph Performance Testing**

## **Ceph osd bench**

The Ceph OSD Bench tool is a utility used for benchmarking the performance of Ceph Object Storage Daemons (OSDs). It allows you to simulate different types of workloads and measure the throughput, latency, and other performance metrics of your Ceph cluster.

The `ceph tell` command is a versatile tool that can be used not only for performance testing but also for monitoring, maintenance, and automation tasks in Ceph clusters.

Usage:

```
ceph tell <name (type.id)> <command> [options...]
```

List all available commands.

Usage:

```
ceph tell <name (type.id)> help
```

**Example:**

```
[rook@tclru002 /]$ ceph tell osd.62 bench
{
    "bytes_written": 1073741824,
    "blocksize": 4194304,
    "elapsed_sec": 0.52926448199999998,
    "bytes_per_sec": 2028743398.6548903,
    "iops": 483.69011846897371
}
```

### Ceph pool bench

In Ceph, the `ceph bench` command is used for benchmarking purposes to measure the performance of the storage cluster. It allows you to simulate various workloads and test the performance of Ceph in terms of read/write throughput, latency, and other metrics. Here are some common options available for the `ceph bench` command:

```
-t N, --concurrent-ios=N
```

Set number of concurrent I/O operations.

```
--show-time
```

Prefix output with date/time.

```
--no-verify
```

Do not verify contents of read objects.

```
--write-object
```

Write contents to the objects.

```
--write-omap
```

Write contents to the omap.

```
--write-xattr
```

Write contents to the extended attributes.

**Example:**

```
[rook@tclru002 /]$ rados bench -p cinder.nvme 10 write
hints = 1
Maintaining 16 concurrent writes of 4194304 bytes to objects of size 4194304 for up to 10 seconds or 0 objects
Object prefix: benchmark_data_tclru002_41432
  sec Cur ops   started  finished  avg MB/s  cur MB/s last lat(s)  avg lat(s)
    0       0         0         0         0         0           -           0
    1      16       624       608   2431.73      2432   0.0494825   0.0260557
    2      16      1260      1244   2487.61      2544   0.0239319   0.0255206
    3      16      1957      1941   2587.56      2788   0.0159702   0.0246469
    4      16      2671      2655   2654.54      2856   0.0139591   0.0239974
    5      16      3412      3396   2716.33      2964   0.0219474   0.0234938
    6      16      4133      4117   2744.19      2884   0.0276837   0.0232849
    7      16      4847      4831    2760.1      2856   0.0160697   0.0231393
    8      16      5581      5565   2782.02      2936   0.0177683   0.0229799
    9      16      6293      6277   2789.29      2848   0.0175105    0.022901
   10      16      6990      6974   2789.12      2788   0.0145607   0.0229147
Total time run:         10.0198
Total writes made:      6990
Write size:             4194304
Object size:            4194304
Bandwidth (MB/sec):     2790.47
Stddev Bandwidth:       170.356
Max bandwidth (MB/sec): 2964
Min bandwidth (MB/sec): 2432
Average IOPS:           697
Stddev IOPS:            42.589
Max IOPS:               741
Min IOPS:               608
Average Latency(s):     0.022914
Stddev Latency(s):      0.00722401
Max latency(s):         0.194613
Min latency(s):         0.0103783
Cleaning up (deleting benchmark objects)
Removed 6990 objects
Clean up completed and total clean up time :0.511463
```
