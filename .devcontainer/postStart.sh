#!/bin/bash

echo "Script executed from: ${PWD}"

BASEDIR=$(dirname $0)
echo "Script location: ${BASEDIR}"

cd $BASEDIR/..
echo CURRENT DIRECTORY IS $PWD

chmod 777 start-database.sh

cp .env.example .env
chmod 777 .env

/bin/bash -c ./start-database.sh

sleep 6s
echo START DATABASE DEPLOYMENT

set -a
source .env
./.env

npm run postinstall
npm exec prisma db push
npm exec -y tsx -- prisma/insert.ts
# npm run build
# npm run dev