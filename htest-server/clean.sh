#!/bin/sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Cleaning build files..."
rm -rfv "`readlink -f "$SCRIPT_DIR/.."`/htest-server_"*
rm -rfv "$SCRIPT_DIR/debian/debhelper-build-stamp"
rm -rfv "$SCRIPT_DIR/debian/htest-server.debhelper.log"
rm -rfv "$SCRIPT_DIR/debian/htest-server/"

exit 0
