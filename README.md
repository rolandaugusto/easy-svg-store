# easy-svg-store

No Fuzz SVG sprite generator. Just Specify the folder containing the SVG
files!

The result is a SVG sprite with the given filenames as ID in lowercase

Installation
============

npm install easy-svg-store

Usage
======

```javascript
var path = require('path');
var esvgs = require('easy-svg-store');

var mySVGsFolder = path.join(__dirname, 'svgs');

// This will generate a SVG file called svgstore.svg and a HTML file svgstore.html
esvgs(mySVGsFolder, {
        svgSpriteName: 'svgstore', // The desired file name
        outputDirectory: __dirname, // Where you want to output the sprite
        outputHtml: true // Do you want to generate a HTML file to see the result?
      }
);
```
