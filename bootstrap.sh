#!/usr/bin/env bash

apt-get update
apt-get install -y python-software-properties python g++ make git-core imagemagick graphicsmagick
add-apt-repository ppa:chris-lea/node.js
apt-get update
apt-get install -y nodejs
cd /vagrant
npm install
./node_modules/bower/bin/bower install
