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
        var filesPath = [],
            processedFiles = [],
            initialFiles = files.length;
        if (err) {
            console.error(err);
            return;
        }

        files = files.filter(function (value) {
            return value !== options.svgSpriteName + '.svg' && _path.extname(value) === '.svg';
        });

        for (var i = 0; i < files.length; i++) {
                filesPath[i] = _path.join(path, files[i]);
        }

        console.log(`Total files in folder: ${initialFiles}, SVGs found: ${filesPath.length}`);

        readMultipleFiles(filesPath, 'utf-8', function (err, contents) {

            contents.map(function (item, index) {
                var symbolId = files[index].split('.')[0].toLowerCase();
                item = item.replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"/g, '');
                item = item.replace(/<svg /g, '<symbol id="' + symbolId + '" ');
                item = item.replace(/<\/svg>/g, '</symbol>');
                processedFiles += item;
                console.log(item);
            });

            var svgTopBefore = '<svg xmlns="http://www.w3.org/2000/svg">';
            var svgTopAfter = '</svg>';

            fs.writeFile(_path.join(path, options.svgSpriteName + '.svg'), svgTopBefore + processedFiles + svgTopAfter);
        });
    });
};
