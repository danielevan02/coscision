#!/bin/bash

echo "Script executed from: ${PWD}"

BASEDIR=$(dirname $0)
echo "Script location: ${BASEDIR}"

cd $BASEDIR/..
echo CURRENT DIRECTORY IS $PWD

chmod 777 .env.example
chmod 777 start-database.sh

cp .env.example .env
/bin/bash -c start-database.sh

npm run postinstall
npm exec -y tsx -- prisma/insert.ts
# npm run build
npm run serve