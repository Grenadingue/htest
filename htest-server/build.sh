#!/bin/sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="$SCRIPT_DIR/source"
DEBIAN_DIR="$SCRIPT_DIR/debian"
NODE_MODULES="$SOURCE_DIR/node_modules"
NODE_MODULES_SAVE="$SCRIPT_DIR/node_modules.save"

if [ -d "$NODE_MODULES" ]; then
  echo "Saving current 'source/node_modules' as 'nodes_modules.save'..."
  mv "$NODE_MODULES" "$NODE_MODULES_SAVE"
fi

echo "Retrieving npm's production dependencies as 'source/node_modules'..."
cd "$SOURCE_DIR"
npm install --prod
cd -

echo "Building debian package from package source..."
# do not check build dependencies because archlinux's dpkg tools are unable to check it
dpkg-buildpackage --no-check-builddeps

echo "Deleting newly generated 'source/node_modules'..."
rm -rf "$NODE_MODULES"

if [ -d "$NODE_MODULES_SAVE" ]; then
  echo "Replacing back 'node_modules.save' to 'source/node_modules'..."
  mv "$NODE_MODULES_SAVE" "$NODE_MODULES"
fi
