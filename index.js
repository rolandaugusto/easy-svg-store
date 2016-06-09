var fs = require('fs');
var path = require('path');
var readMultipleFiles = require('read-multiple-files');

/**
 *
 * @param folder{string} The folder containing the SVG files
 * @param options{object}
 *              svgSpriteName{string} filename - The name for the svg sprite file
 *              outputDirectory{string} directory - The file destination
 *              outputHtml{boolean} -  Should an HTML file be generated? Mostly for quick review
 *
 * @return void
 *
 */
module.exports = function (folder, options) {
    // Globals
    var filesPath = [], processedFiles = [], htmlOut = [];

    folder = folder || '';
    options = options || {};

    options.svgSpriteName = options.svgSpriteName || 'svgsprite';
    options.outputDirectory = options.outputDirectory || folder;
    options.outputHtml = options.outputHtml || false;
    options.commandLine = options.commandLine || false;

    fs.readdir(folder, function (err, files) {

        if (err) {
            console.error(err);
            return;
        }

        files = files.filter(function (value) {
            return value !== options.svgSpriteName + '.svg' && path.extname(value) === '.svg';
        });

        for (var i = 0; i < files.length; i++) {
            filesPath[i] = path.join(folder, files[i]);
        }

        readMultipleFiles(filesPath, 'utf-8', function (err, contents) {

            contents.map(function (item, index) {
                var symbolId = files[index].split('.')[0].toLowerCase();
                item = item.replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"/g, '')
                    .replace(/<svg /g, '<symbol id="' + symbolId + '"')
                    .replace(/<\/svg>/g, '</symbol>')
                    // Remove unnecessary attributes
                    .replace(/( width)="([^"]+)"/g, '')
                    .replace(/( height)="([^"]+)"/g, '');

                if (options.outputHtml) {
                    item.replace(/viewBox="([^"]+)"/g, function (match) {
                        htmlOut += '<svg ' + match + '><use xlink:href=\"#' + symbolId + '\"></use></svg>';
                    });
                }
                processedFiles += item;
            });

            var outputUri = path.join(options.outputDirectory, options.svgSpriteName);
            var resultSVGBuffer = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" ' +
              '>' + processedFiles + '</svg>';

            fs.writeFile(outputUri + '.svg', resultSVGBuffer);

            if (options.outputHtml) {
                fs.writeFile(outputUri + '.html',
                    '<!doctype html><html lang="en">' +
                    '<style>svg{display:"inline-block";width:20%;padding:2%;}</style>' +
                    resultSVGBuffer +
                    htmlOut +
                    '</html>');
            }
        });
    });

    if (options.commandLine) {
        console.log('SUCCESS!');
        console.log('-> Source directory: %s, Output directory: %s, SVG Sprite file name: %s, output Html?: %s',
        folder, options.outputDirectory, options.svgSpriteName, options.outputHtml);
    }
};
