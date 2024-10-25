// gulpfile.mjs (EMS Syntax)
import gulp from 'gulp';
import * as sass from 'sass'; // Updated import syntax
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css'; // CSS Minifier
import browserSync from 'browser-sync'; // Browser sync handler on update

const sassCompiler = gulpSass(sass);
const browserSyncServer = browserSync.create();
const splitter = '------------------------------------------------------------------------------------------------'; // for better readability

// Define file paths
const paths = {
  scss: './scss/**/*.scss', // SCSS pull location
  css: './css', // CSS output location
};

// Compile SCSS to CSS
const compileSCSS = () => {
  console.log(splitter); // Insert separator
  return gulp
    .src(paths.scss)
    .pipe(sassCompiler().on('error', sassCompiler.logError)) // Compile SCSS and handle errors
    .pipe(autoprefixer()) // Add vendor prefixes
    .pipe(cleanCSS()) // Minify CSS
    .pipe(gulp.dest(paths.css)) // Output CSS to CSS folder
    .pipe(browserSyncServer.stream()) // Stream changes to browser
    .on('end', () => console.log(splitter)); // Insert separator
};

// Watch SCSS files for changes
const watchFiles = () => {
  browserSyncServer.init({
    server: {
      baseDir: './', // Base directory for BrowserSync
    },
  });
  gulp.watch(paths.scss, compileSCSS); // Watch SCSS files
  gulp.watch('./*.html').on('change', browserSyncServer.reload); // Reload on HTML changes
};

// Export tasks
export default gulp.series(compileSCSS, watchFiles); // Default task
