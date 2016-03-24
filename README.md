# easy-svg-store

No Fuzz SVG sprite generator. Just Specify the folder containing the SVG
files!

The result is a SVG sprite which items have their filenames as ID in lowercase

Installation
============

Not published yet

Usage
======

```javascript
var path = require('path');
var esvgs = require('easy-svg-store');

esvgs(path.join(__dirname, '..', 'svgs'), {
        svgSpriteName: 'svgstore', // The desired file name e.g. svgstore.svg
        outputDirectory: __dirname // Where you want to output the sprite
      }
);
```
