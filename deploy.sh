#!/bin/bash

# Go to project folder
cd /home/oishik/movers || exit

# Discard local changes and pull latest
git reset --hard origin/main
git pull origin main

# Install dependencies and build
npm install
npm run build

# Copy build folder to web root
sudo cp -r build/* /var/www/movers.infizestpublishing.com/

# Reload Nginx
sudo systemctl reload nginx
