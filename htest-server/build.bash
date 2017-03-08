#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="$SCRIPT_DIR/source"
CONFIG_DIR="$SOURCE_DIR/config"
CONFIG_DIR_SAVE="$SCRIPT_DIR/config.save"
NODE_MODULES="$SOURCE_DIR/node_modules"
NODE_MODULES_SAVE="$SCRIPT_DIR/node_modules.save"

echo "Moving current configuration '$CONFIG_DIR/*.json' inside '$CONFIG_DIR_SAVE'..."
mkdir -v "$CONFIG_DIR_SAVE"
mv -v "$CONFIG_DIR"/*.json "$CONFIG_DIR_SAVE"

if [ -d "$NODE_MODULES" ]; then
  echo "Saving current '$NODE_MODULES' as '$NODE_MODULES_SAVE'..."
  mv "$NODE_MODULES" "$NODE_MODULES_SAVE"
fi

echo "Retrieving npm's production dependencies as '$NODE_MODULES'..."
cd "$SOURCE_DIR"
npm install --prod
cd -

echo "Building debian package from package source..."
# do not check build dependencies because archlinux's dpkg tools are unable to check it
dpkg-buildpackage -d # '-d' means '--no-check-builddeps'

echo "Deleting newly generated '$NODE_MODULES'..."
rm -rf "$NODE_MODULES"

if [ -d "$NODE_MODULES_SAVE" ]; then
  echo "Replacing back '$NODE_MODULES_SAVE' to '$NODE_MODULES'..."
  mv "$NODE_MODULES_SAVE" "$NODE_MODULES"
fi

echo "Moving back configuration inside '$CONFIG_DIR'..."
mv -v "$CONFIG_DIR_SAVE"/*.json "$CONFIG_DIR"
rmdir -v "$CONFIG_DIR_SAVE"
