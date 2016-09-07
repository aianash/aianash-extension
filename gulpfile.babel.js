import gulp from 'gulp'
import fs from 'fs'
import path from 'path'
import {merge} from 'event-stream'
import map from 'map-stream'
import {spawn} from 'child_process'
import minify from 'gulp-minify'
import cleanCss from 'gulp-clean-css'
const $ = require('gulp-load-plugins')()

// Tasks
gulp.task('clean', () => {
  return pipe('./tmp', $.clean())
})

gulp.task('build', (cb) => {
  $.runSequence('clean', 'chrome', cb)
})

gulp.task('default', ['build'], () => {
  gulp.watch(['./libs/**/*', './src/**/*'], ['default'])
})

gulp.task('dist', ['build'], (cb) => {
  $.runSequence('chrome:zip', 'chrome:crx', cb)
})

gulp.task('fonts', () => {
  return pipe(
    './fonts/*',
    './tmp/fonts/'
  )
})

gulp.task('styles', () => {
  return pipe(
    './src/styles/*',
    $.autoprefixer({cascade: true}),
    cleanCss({compatibility: 'ie8'}),
    './tmp/'
  )
})

// Chrome
gulp.task('chrome:js', ['styles', 'fonts'], () => {
  return merge(
    buildJs(['./src/constants.js', './src/util.js', './src/main.js'], 'main.js', {CHROME: true}),
    buildJs(['./src/constants.js', './src/util.js', './src/aiasectiontagger.js', './src/aianash.js'], 'aianash.js', {CHROME: true}),
    buildJs(['./src/constants.js', './src/util.js', './src/transport.js'], 'transport.js', {CHROME:true})
  )
})

gulp.task('chrome', ['chrome:js'], () => {
  return merge(
    pipe('./icons/**/*', './tmp/chrome/icons/'),
    pipe(['./libs/*', './src/config/chrome/manifest.json', './src/template.html'], './tmp/chrome/'),
    pipe(['./tmp/**/'], './tmp/chrome/')
  )
})

gulp.task('chrome:zip', () => {
  return pipe('./tmp/chrome/**/*', $.zip('chrome.zip'), './dist')
})

gulp.task('chrome:_crx', (cb) => {
  $.run(' google-chrome' +
    ' --pack-extension=' + path.join(__dirname, './tmp/chrome') // +
    // ' --pack-extension-key=' + path.join(process.env.HOME, '.ssh/chrome.pem')
  ).exec(cb)
})

gulp.task('chrome:crx', ['chrome:_crx'], () => {
  return pipe('./tmp/chrome.crx', './dist')
})

// Helpers
function pipe(src, ...transforms) {
  return transforms.reduce((stream, transform) => {
    const isDest = typeof transform === 'string'
    return stream.pipe(isDest ? gulp.dest(transform) : transform)
  }, gulp.src(src))
}

function html2js(template) {
  return map(escape)

  function escape(file, cb) {
    const path = $.util.replaceExtension(file.path, '.js')
    const content = file.contents.toString()
    const escaped = content
      .replace(/\\/g, "\\\\")
      .replace(/'/g, "\\'")
      .replace(/\r?\n/g, "\\n' +\n    '")
    const body = template.replace('$$', escaped)

    file.path = path
    file.contents = new Buffer(body)
    cb(null, file)
  }
}

function buildJs(src, target, ctx) {
  return pipe(
    src,
    $.babel(),
    $.concat(target),
    $.preprocess({context: ctx}),
    minify({
      ext: {
        min: '.js',
      },
      noSource: true
    }),
    './tmp'
  )
}

function buildTemplate(src, varname, ctx) {
  const LOTS_OF_SPACES = new Array(500).join(' ')

  return pipe(
    src,
    $.preprocess({context: ctx}),
    $.replace('__SPACES__', LOTS_OF_SPACES),
    html2js('const ' + varname + ' = \'$$\''),
    './tmp'
  )
}
