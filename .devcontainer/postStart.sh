#!/bin/bash

echo "Script executed from: ${PWD}"

BASEDIR=$(dirname $0)
echo "Script location: ${BASEDIR}"

chmod 777 $BASEDIR/../.env.example
chmod 777 $BASEDIR/../start-database.sh

cp $BASEDIR/../.env.example $BASEDIR/../.env
/bin/bash -c "$BASEDIR/../start-database.sh"