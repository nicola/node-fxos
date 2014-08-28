var gulp = require('gulp');
var deploy = require("gulp-gh-pages");
var pygmetize = require('pygmentize-bundled');
var fs = require('fs');
var marked = require('gulp-markdown');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var footer = require('gulp-footer');
var header = require('gulp-header');
var stylus = require('gulp-stylus');
var nib = require('nib');
var connect = require('gulp-connect');
var mainBowerFiles = require('main-bower-files');

var paths = {
  site: 'site/*.html',
  styles: 'site/media/*.stylus',
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

gulp.task('styles', function () {
  gulp.src(paths.styles)
    .pipe(stylus({use: [nib()]}))
    .pipe(gulp.dest('./dist/media/'));
});

gulp.task('deploy',  function () {
  gulp.src("./dist/**/*")
      .pipe(deploy());
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true,
    port: 8001
  });
});

gulp.task('vendor', function() {
  gulp.src('bower_components/**/*')
    .pipe(gulp.dest('./dist/vendor'));
});

gulp.task('watch', function() {
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.site, ['website']);
  gulp.watch(paths.pages, ['website']);
});
gulp.task('default', ['website', 'styles', 'connect', 'watch', 'vendor']);