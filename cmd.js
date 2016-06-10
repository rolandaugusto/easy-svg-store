#!/usr/bin/env node
var program = require('commander');
var esvgs = require('./index.js');

program
  // .arguments('<folder>')
  .option('-s, --sprite-name [name]', 'The name for the generated sprite [default: svgstore.svg].')
  .option('-i, --input [dir]', 'The folder containing the svg files [default: ' + process.cwd() + '].')
  .option('-o, --output [dir]', 'The destination folder for the output [default: ' + process.cwd() + '].')
  .option('-x, --html', 'Generate a HTML example [default: false].')
  .parse(process.argv);

  esvgs(program.input || process.cwd(), {
          svgSpriteName: program.spriteName || 'svgstore',
          outputDirectory: program.output || process.cwd(),
          outputHtml: program.html || false,
          commandLine: true
        }
  );
