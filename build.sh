#!/usr/bin/env bash

mkdir -p builds

cd frontends || exit

for f in ./*; do
    if [ -d "$f" ]; then
      echo "starting to build $f"
      cd "$f" || return
      yarn
      yarn build
      yarn build-standalone
      mv ./dist "../../builds/$f"
      cd ..
    fi
done