[![npm version](https://badge.fury.io/js/easy-svg-store.svg)](https://badge.fury.io/js/easy-svg-store)

# easy-svg-store

No Fuzz SVG sprite generator. Just Specify the folder containing the SVG
files!

The result is a SVG sprite with the given filenames as ID in lowercase

Installation
============

npm install easy-svg-store

Use as a component
===================

```javascript
var path = require('path');
var esvgs = require('easy-svg-store');

// The source folder with the svgs
var mySVGsFolder = path.join(__dirname, 'svgs');

// This will generate a SVG file called svgstore.svg and a HTML file svgstore.html
esvgs(mySVGsFolder, {
        svgSpriteName: 'svgstore', // The desired file name
        outputDirectory: __dirname, // Where you want to output the sprite
        outputHtml: true // Do you want to generate a HTML file to see the result?
      }
);
```
Use from command line
=====================

```bash
Usage: esvgs [options]

  Options:

    -h, --help         output usage information
    -s, --sprite-name  The name for the generated sprite [default: svgstore.svg].
    -f, --folder       The folder containing the svg files [default: /Users/rcastillo/Documents/svgs].
    -o, --output       The destination folder for the output [default: /Users/rcastillo/Documents/svgs].
    -d, --html         True if a HTML example should be generated [default: false].

```
