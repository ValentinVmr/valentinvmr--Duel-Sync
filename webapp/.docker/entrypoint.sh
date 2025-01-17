#!/bin/sh

envsubst < ./env.template.js > ./env.js
rm env.template.js
nginx -g "daemon off;"
