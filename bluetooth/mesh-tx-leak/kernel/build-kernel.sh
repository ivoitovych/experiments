#!/bin/bash
# build-kernel.sh <name> <srcdir> <fragments...>
set -e
name=$1; src=$2; shift 2
out=/home/user/work/build-$name
mkdir -p $out
export CCACHE_DIR=/home/user/work/ccache CCACHE_BASEDIR=/home/user/work CCACHE_NOHASHDIR=1 CCACHE_SLOPPINESS=time_macros,include_file_mtime,include_file_ctime
cd $src
make O=$out x86_64_defconfig >/dev/null
scripts/kconfig/merge_config.sh -m -O $out $out/.config "$@" >/dev/null
make O=$out olddefconfig >/dev/null
make O=$out CC="ccache gcc" -j$(nproc) bzImage 2>&1 | grep -E "error|warning:|Kernel: " || true
test -f $out/arch/x86/boot/bzImage
echo "BUILT $name $(git -C $src log --oneline -1)"
