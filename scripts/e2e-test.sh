#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "Starting Protractor!"
echo "-------------------------------------------------------------------"
echo $BASE_DIR
node_modules/protractor/bin/protractor $BASE_DIR/../config/protractorConf.js $*