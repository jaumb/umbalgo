#!/usr/bin/env sh
set -v
pushd .
cd docs/js/es6
../../../node_modules/.bin/babel insertion.js -d ..
popd
