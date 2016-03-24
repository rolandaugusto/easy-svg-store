/*
* Easy SVG store
*
* No Fuzz svg sprite
*
* */
var fs = require('fs');
var _path = require('path');
var readMultipleFiles = require('read-multiple-files');

module.exports = function (path, options) {
    path = path || '';
    options = options || {};

    options.svgSpriteName = options.svgSpriteName || 'svgsprite';

    fs.readdir(path, function (err, files) {
        var filesPath = [];
        if (err) {
            console.error(err);
            return;
        }

        files = files.filter(function (value) {
            return value !== options.svgSpriteName + '.svg' || _path.extname(value) === 'png';
        });

        for (var i = 0; i < files.length; i++) {
            // if (_path.extname(files[i]) === '.svg') {
                filesPath[i] = _path.join(path, files[i]);
            // } else {
            //     console.log('skipping file with extension: ', _path.extname(files[i]));
            // }
        }

        console.log(`Total files in folder: ${files.length}, SVGs found: ${filesPath.length}`);

        readMultipleFiles(filesPath, 'utf-8', function (err, contents) {

            contents.map(function (item, index) {
                var symbolId = files[index].split('.')[0].toLowerCase();
                item = item.replace(/<svg /g, '<symbol id="' + symbolId + '" ');
                item = item.replace(/<\/svg>/g, '</symbol>');
                console.log(item);
            });
            fs.writeFile(_path.join(path, options.svgSpriteName + '.svg'), contents);
        });
    });
};
