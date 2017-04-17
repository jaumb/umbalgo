#!/usr/bin/env bash

set -v

WD=$(pwd)
PARSE=${WD}/tools/parser.py
IN=${WD}/src/algo
OUT=/var/www/html/

rm -rf ${OUT}/*
mkdir -p ${OUT}/js/algo
pushd .
cd ${IN}
for f in *.js
do
  ${PARSE} $f ${OUT}/js/algo/$f
done
popd

pushd .
cd src
../node_modules/.bin/babel -d ${OUT}/js/libs libs
../node_modules/.bin/babel -d ${OUT}/js/content content
popd

cp src/html/*.html ${OUT}
mkdir -p ${OUT}/css
cp src/css/*.css ${OUT}/css
cp -r d3/vizlib ${OUT}/js/libs
