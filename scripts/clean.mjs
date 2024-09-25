#!/usr/bin/env node
/* global console */

import * as fs from 'fs';

console.log('Cleaning up the dist folder...');
fs.rmSync('./dist', { recursive: true, force: true });
console.log('Done.\n');

console.log('Cleaning up node modules...');
fs.rmSync('./node_modules', { recursive: true, force: true });
fs.rmSync('./client/node_modules', { recursive: true, force: true });
fs.rmSync('./server/node_modules', { recursive: true, force: true });
fs.rmSync('./package-lock.json', { force: true });
console.log('Done.\n');
