#!/usr/bin/env sh

set -v

WD=$(pwd)
PARSE=${WD}/tools/parser.py
IN=${WD}/src/algo
OUT=${WD}/docs/js/algo

rm -rf docs
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
../node_modules/.bin/babel -d ../docs/js/libs libs
../node_modules/.bin/babel -d ../docs/js/content content
popd

cp src/html/*.html docs
mkdir -p docs/css
cp src/css/*.css docs/css
cp -r d3/vizlib docs/js/libs
