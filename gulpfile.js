const gulp = require('gulp')
const sass = require('gulp-sass')
const autoPrefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync')

let config = {
  src: './resources/assets/sass/**/*.scss',
  dest: './resources/views/css',
  bsConfig: {
    server: {
      baseDir: './resources/views/'
    } ,
    port: 8000,
    open: true,
    notify: true
  }
}


gulp.task('sass' , () =>
  gulp.src(config.src)
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoPrefixer())
    .pipe(gulp.dest(config.dest))
)

gulp.task('serve' , () => {
  browserSync.init(config.bsConfig)
})

gulp.task('build' , () =>{
  return gulp.src(config.src)
            .pipe(sass({outputStyle: 'expanded'}))
            .pipe(autoPrefixer())
            .pipe(gulp.dest(config.dest))
})

gulp.task('watch' , () => {
  gulp.watch(config.src , ['sass'])
  gulp.watch('./resources/views/**/*.html').on('change' , browserSync.reload)
  gulp.watch('./resources/views/css/**/*.css').on('change' , browserSync.reload)
  gulp.watch('./resources/views/js/**/*.js').on('change' , browserSync.reload)
})

gulp.task('default' , ['serve' , 'sass' , 'watch'])
