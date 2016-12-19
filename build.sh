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

pushd .
cd src
../node_modules/.bin/babel -d ../docs/js ./libs/runner/runner.js
popd
