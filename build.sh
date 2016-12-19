#!/usr/bin/env sh

WD=$(pwd)
PARSE=${WD}/tools/parser.py
IN=${WD}/src/algo
OUT=${WD}/docs/js/libs/algo

rm -rf ${OUT}
mkdir -p ${OUT}
pushd .
cd ${IN}
for f in *.js
do
  ${PARSE} $f ${OUT}/$f
done
popd

./node_modules/.bin/babel -d ./docs/js/libs/runner ./src/libs/runner/runner.js
