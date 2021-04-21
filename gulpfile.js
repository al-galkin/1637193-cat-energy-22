const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require('gulp-csso');
//const csso = require('csso');
const htmlmin = require("gulp-htmlmin");
const terser = require("gulp-terser");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const del = require("del");
const sync = require("browser-sync").create();

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// HTML

const html = () => {
  return gulp.src("source/**/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
}

exports.html = html;

// Scripts

const scripts = () => {
  return gulp.src("source/js/script.js")
    .pipe(terser())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.scripts = scripts;

// Images

const optimize_images = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
}

exports.optimize_images = optimize_images;

const copy_images = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(gulp.dest("build/img"))
}

exports.copy_images = copy_images;

// WebP

const create_webp = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 85}))
    .pipe(gulp.dest("build/img"))
}

exports.create_webp = create_webp;

// Sprites

const sprite = () => {
  return gulp.src("source/img/icons/*.svg") //todo добавить иконки для спрайта в отдельную папку icons
    .pipe(svgstore({inLineSvg: true}))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
}

exports.sprite = sprite;

// Copy (fonts, .ico, .svg)

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
    "source/img/**/*.{svg}",
    "!source/img/icons/*.svg",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;


// Clean

const clean = () => {
  return del("build");
};

exports.clean = clean;

// Reload

const reload = (done) => {
  sync.reload();
  done();
}

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/js/script.js", gulp.series(scripts));
  gulp.watch("source/*.html", gulp.series(html, reload));
}

// Build

const build = gulp.series(
  clean,
  copy,
  optimize_images,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    create_webp
  ),
);

exports.build = build;

exports.default = gulp.series(
  clean,
  copy,
  copy_images,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    create_webp
  ),
  gulp.series(
    server,
    watcher
  )
);
