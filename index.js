
var fs = require('fs');
var _path = require('path');


module.exports = function (path, options) {

    path = path || '';
    options = options || {};


    fs.readdir(path, function(err, files) {
        if (err) {
            console.error(err);
            return;
        }
        files.forEach(function(filename) {
            console.log(files);
            fs.readFile(_path.join(path, filename), 'utf-8', function (err, data) {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(data);
            })
        });
    });

    return true;

};