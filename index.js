var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
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
                    .replace(/<svg /g, '<svg id="' + symbolId + '"')
                    .replace(/<\/svg>/g, '</svg>')
                    //Add a prefix to all the found IDs
                    .replace(/( id)="([^"]+)"/g, function (match, p1, p2) {
                      return ' id="' + symbolId + (p2 !== symbolId ? '-' + p2 : '') + '"';
                    })
                    //Replace the IDs usage 'url(#id) ' throughout the svg
                    .replace(/(url\(#)([\w]*)(\))/g, function (match, p1, p2) {
                      return 'url(#' + symbolId + '-' + p2 + ')';
                    })
                    // Remove dimensions in order to allow its config via css
                    .replace(/( width)="([^"]+)"/g, '')
                    .replace(/( height)="([^"]+)"/g, '')
                ;

                if (options.outputHtml) {
                    item.replace(/viewBox="([^"]+)"/g, function (match) {
                        htmlOut += '<svg ' + match + '><use xlink:href=\"#' + symbolId + '\"></use></svg>';
                    });
                }
                processedFiles += item;
            });

            var outputUri = path.join(options.outputDirectory, options.svgSpriteName);
            var resultSVGBuffer = (
              '<?xml version="1.0"?>' +
              '\n<svg xmlns="http://www.w3.org/2000/svg">' +
                processedFiles +
              '</svg>'
             );

            fs.writeFile(outputUri + '.svg', resultSVGBuffer);

            if (options.outputHtml) {
                fs.writeFile(outputUri + '.html',
                    '<!doctype html><html lang="en">' +
                    '<style>svg{width:20%;padding:2%;}</style>' +
                    '<div style="position:absolute;left:-9999px;">' + resultSVGBuffer + '</div>' +
                    htmlOut +
                    '</html>');
            }
        });
    });

    if (options.commandLine) {
        console.log(chalk.bold.cyan(' SVG SPRITE GENERATED!'));
        console.log(
          chalk.magenta(' Source directory: ') + ' %s' +
          chalk.magenta('\n Output directory:') +  ' %s' +
          chalk.magenta('\n SVG Sprite location:') + ' %s' +
          chalk.magenta('\n HTML demo:') + ' %s',
          folder,
          options.outputDirectory,
          options.outputDirectory + '/' + options.svgSpriteName + '.svg',
          options.outputHtml ? options.outputDirectory + '/' + options.svgSpriteName + '.html' : 'none');
    }
};
