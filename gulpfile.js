const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require("gulp-autoprefixer");
const uglify = require('gulp-uglify');
const deleteFile = require('delete');
const sass = require("gulp-sass")(require('sass'));
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const jsmin = require('gulp-jsmin');
const browserSync = require('browser-sync').create();
// const imageMin = require('gulp-imagemin');пробовал подключить но не нашел решение на новый синтаксис через "import--from"
gulp.task("minify", () => {
    return gulp.src("src/*.html")
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest("dist/html"));
})
gulp.task("build-css", function () {
    return gulp.src("src/styles/style.scss")
        .pipe(autoprefixer({
            browsers: ["last 2 version"],
            cascade: false
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest("dist/style"));
})
gulp.task("build-js", function () {
    return gulp.src("src/js/*.js")
        // .pipe(uglify())
        .pipe(jsmin())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("dist/js"));
})

gulp.task("buildImg", function () {
    return gulp.src("src/img/**")
        // .pipe(imagemin({
        //     progressive: true
        // }))
        .pipe(gulp.dest("dist/img/"));
});
gulp.task("deleteFiles", function () {
    return deleteFile("dist/")
})
gulp.task("build", gulp.series("deleteFiles", gulp.parallel("minify", "build-js", "build-css", "buildImg" )));
gulp.watch(
    ["src/styles/**/**/*.scss", "src/*.html", "src/js/**/**/*.js", "src/img/**/*.png"],
    gulp.series("build")
);