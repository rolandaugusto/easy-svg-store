#!/usr/bin/env node
var program = require('commander');
var esvgs = require('./index.js');

program
  .option('-i, --input [dir]', 'The directory containing the svg files [default: ' + process.cwd() + '].')
  .option('-o, --output [dir]', 'The destination directory for the output [default: ' + process.cwd() + '].')
  .option('-s, --sprite-name [name]', 'The name for the generated sprite [default: svgstore.svg].')
  .option('-x, --html', 'Generate a HTML example [default: false].')
  .parse(process.argv);

  esvgs(program.input || process.cwd(), {
          svgSpriteName: program.spriteName || 'svgstore',
          outputDirectory: program.output || process.cwd(),
          outputHtml: program.html || false,
          commandLine: true
        }
  );
