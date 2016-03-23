
var fs = require('fs');
var _path = require('path');
var readMultipleFiles = require('read-multiple-files');

module.exports = function (path, options) {

    path = path || '';
    options = options || {};

    fs.readdir(path, function(err, files) {
        var filesPath = [];

        if (err) {
            console.error(err);
            return;
        }

        for (var i=0; i < files.length; i++) {
            filesPath[i] = _path.join(path, files[i]);
        }

        readMultipleFiles(filesPath, 'utf-8', function (err, contents) {

            fs.writeFile(_path.join(path, 'svgstore.svg'), contents)

        });
    });

    return true;

};
