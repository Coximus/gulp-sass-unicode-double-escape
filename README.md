# gulp-sass-unicode-double-escape
Replaces double slashes introduced by gulp-sass for unicode characters

## Usage
First install gulp-sass-unicode-double-escape
```
npm install --save-dev gulp-sass-unicode-double-escape
```

Then add it to your gulpfile.js
```javascript
var sass = require('gulp-sass'),
    sassUnicodeFix = require('gulp-sass-unicode-double-escape');

gulp.task('build', function() {
   return gulp.src(['input.scss'])
        .pipe(sass)
        .pipe(sassUnicodeFix())
        .pipe(gulp.dest('css/'));
});
```

## Issue
Using gulp-sass to compile the following SASS will result in the current version of gulp-sass to generate CSS with incorrectly escaped unicode characters:

### SASS
```
$open-quote:    \00AB;
$close-quote:   \00BB;

q{
    quotes:"\2018" "\2019" "#{$open-quote}" "#{$close-quote}";
}
```

### Generated CSS
```
q{
    quotes:"\2018" "\2019" "\\00AB" "\\00BB";
}
```

## Resolution
Using this gulp extension the double escaping of gulp-sass will be reverted