
/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
module.exports = {
  "files": ["./public/**/*.html","./public/**/*.js","./public/**/*.css"],
  server: {
    baseDir: './public',
    index: 'index.html',
    serveStaticOptions: {
          extensions: ["html"]
        }
  }
};
