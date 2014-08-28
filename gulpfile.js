var gulp = require('gulp');
var deploy = require("gulp-gh-pages");
var pygmetize = require('pygmentize-bundled');
var fs = require('fs');
var marked = require('gulp-markdown');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var footer = require('gulp-footer');
var header = require('gulp-header');

var paths = {
  site: 'site/**/*',
  dist: 'dist/**/*',
  pages: 'pages/*.md'
};

gulp.task('website', function () {
  var content = {
    footer: fs.readFileSync('site/footer.html'),
    header: fs.readFileSync('site/header.html')
  };

  gulp.src(paths.pages)
    .pipe(marked({
      highlight: function (code, lang, callback) {
        pygmetize({ lang: lang, format: 'html' }, code, function (err, result) {
          callback(err, result.toString());
        });
      }
    }))
    .pipe(rename(function (path) {
      path.extname = '.html';
    }))
    .pipe(header('<section>'))
    .pipe(footer('</section>'))
    .pipe(concat('index.html'))
    .pipe(header(content.header))
    .pipe(footer(content.footer))
    .pipe(gulp.dest('dist'));

});

gulp.task('deploy', ['website'],  function () {
    gulp.src("./dist/**/*")
        .pipe(deploy());
});

gulp.task('default', ['deploy']);