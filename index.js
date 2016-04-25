'use strict';

var gutil = require( "gulp-util" ),
	through = require('through2');

module.exports = function() {
	var regEx = /"\\\\([0-9A-F]{4})"/g;
	return through.obj( function (file, _, next) {
		if (file.isNull()) {
			next(null, file);
			return;
		}

		if (file.isStream()) {
			next(new gutil.PluginError('gulp-sass-unicode-double-escape', 'Streaming not supported'));
			return;
		}

		try {
			file.contents = new Buffer(file.contents.toString().replace(regEx, function(input){
				return "\"\\" + input.substring(3,7) + "\"" ;

			}));
			this.push(file);
			next();
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-sass-unicode-double-escape', err, {fileName: file.path}));
		}
	});
}