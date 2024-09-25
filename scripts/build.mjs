#!/usr/bin/env node
/* global console */

import * as esbuild from 'esbuild';
import * as fs from 'fs';

const buildServerApp = async () =>
  esbuild.build({
    entryPoints: ['./server/src/index.ts'],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    outfile: './dist/index.cjs',
    minify: true,
    metafile: true,
  });

const buildClientApp = async () => {
  console.log('Copying static files from client/www to dist/www...');
  fs.cpSync('./client/www', './dist/www', { recursive: true }, (err) => {
    if (err) {
      console.error('An error occurred while copying the folder.');
      return console.error(err);
    }
    console.log('Done.');
  });

  return esbuild.build({
    entryPoints: ['./client/src/index.ts'],
    bundle: true,
    outfile: './dist/www/bundle.js',
    format: 'esm',
    minify: true,
    metafile: true,
  });
};

console.log('Cleaning up the dist folder...');
fs.rmSync('./dist', { recursive: true, force: true });
console.log('Done.\n');

console.log('Building server app...');
let result = await buildServerApp();
let meta = await esbuild.analyzeMetafile(result.metafile);
console.log(meta);
console.log('Done.\n');

console.log('Building client app...');
result = await buildClientApp();
meta = await esbuild.analyzeMetafile(result.metafile);
console.log(meta);
console.log('Done.\n');

// Remove the metafile
fs.rmSync('./dist/metafile.json', { force: true });

console.log(
  '%cBuild successful. Find the built files at ./dist\n',
  'color: green; font-weight: bold;',
);
