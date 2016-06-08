#!/usr/bin/env node
var program = require('commander');
var esvgs = require('./index.js');

program
  .option('-s, --sprite-name', 'The name for the generated sprite [default: svgstore.svg].')
  .option('-f, --folder', 'The folder containing the svg files [default: ' + process.cwd() + '].')
  .option('-o, --output', 'The destination folder for the output [default: ' + process.cwd() + '].')
  .option('-d, --html', 'Generate a HTML example [default: false].')
  .parse(process.argv);

  esvgs(program.folder || process.cwd(), {
          svgSpriteName: program.spriteName || 'svgstore',
          outputDirectory: program.output || process.cwd(),
          outputHtml: program.html || false,
          commandLine: true
        }
  );
