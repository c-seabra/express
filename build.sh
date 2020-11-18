#!/usr/bin/env bash

mkdir -p builds

cd frontends || exit

for f in ./*; do
    if [ -d "$f" ]; then
      printf "\n\n##########\n# starting to build $f\n##########\n\n\n"
      cd "$f" || return
      yarn
      yarn build
      yarn build-standalone
      cp -r -f -v ./dist "../../builds/$f"
      cd ..
    fi
done