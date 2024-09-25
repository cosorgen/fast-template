#!/usr/bin/env node
/* global console */

import * as esbuild from 'esbuild';
import { spawn } from 'child_process';
import open from 'open';
import fs from 'fs';

let copyStaticFiles = {
  name: 'copyStaticFiles',
  setup(build) {
    build.onEnd((result) => {
      if (result.errors.length > 0) {
        console.error('An error occurred while building the project.');
        return console.error(result.errors);
      }
      fs.cpSync('./client/www', './dist/www', { recursive: true }, (err) => {
        if (err) {
          console.error('An error occurred while copying the static files.');
          return console.error(err);
        }
      });
    });
  },
};

const serverAppContext = await esbuild.context({
  entryPoints: ['./server/src/index.ts'],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  outfile: './dist/index.js',
  plugins: [copyStaticFiles],
});

const clientAppContext = await esbuild.context({
  entryPoints: ['./client/src/index.ts'],
  bundle: true,
  outfile: './dist/www/bundle.js',
  format: 'esm',
  plugins: [copyStaticFiles],
});

console.log('Building server and client...\n');
await serverAppContext.rebuild();
await clientAppContext.rebuild();

await clientAppContext.watch();
console.log('Watching client for changes...\n');
await serverAppContext.watch();
console.log('Watching server for changes...\n');

const server = spawn('node', ['./dist/index.js'], { platform: 'node' });
server.stdout.on('data', (data) => console.log(`${data}`));
server.stderr.on('data', (data) => console.error(`${data}`));
open('http://localhost:4000');
