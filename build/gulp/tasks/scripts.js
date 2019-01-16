var gulp = require('gulp');
var options = require('../options');
var target = require('../config').targets[options.target];

var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var uglify = require("rollup-plugin-uglify").uglify;
var includePaths = require('rollup-plugin-includepaths');
var chalk = require('chalk');
var fancyLog = require('fancy-log');
var notifier = require('node-notifier');

const plugins = [
  includePaths({
    paths: ['dev/js'],
  }),
  resolve({
    module: true
  }),
  commonjs(),
  babel({
    presets: [
      ['@babel/preset-env', {useBuiltIns: 'entry'}]
    ],
    include: ['./dev/js/**', './node_modules/screen-navigator/src/**'],
  }),
];

if (options.minify){
  plugins.push(uglify());
}

const inputOptions = {
  input: target.js.entries,
  plugins,
  treeshake: !!options.minify,
  cache: null,
};

const outputOptions = {
  file: target.js.dest + '/scripts.js',
  format: 'iife',
  sourcemap: !options.minify
};

if (options.watch){
  const watcher = rollup.watch({
    ...inputOptions,
    output: [outputOptions],
  });

  const taskName = chalk.cyan('scripts');

  let isFirstBuild = true;

  watcher.on('event', event => {
    // event.code can be one of:
    //   START        — the watcher is (re)starting
    //   BUNDLE_START — building an individual bundle
    //   BUNDLE_END   — finished building a bundle
    //   END          — finished building all bundles
    //   ERROR        — encountered an error while bundling
    //   FATAL        — encountered an unrecoverable error

    switch (event.code) {
      case 'START':
      break;
      
      case 'BUNDLE_START':
      if (!isFirstBuild) fancyLog(`Starting '${taskName}'`);
      break;
      
      case 'BUNDLE_END':
        if (isFirstBuild){
          isFirstBuild = false;

          break;
        }

        const time = (event.duration / 1000).toFixed(2) + 's';
        
        fancyLog(`Finished '${taskName}' after ${chalk.magenta(time)}`);
        break;

      case 'ERROR':
      case 'FATAL':
        console.log(chalk.red(event.error));

        notifier.notify('Script error');
        break;
    }
  });
}

gulp.task('scripts', function(){
  return rollup.rollup(inputOptions).then(bundle => {
    inputOptions.cache = bundle;

    return bundle.write(outputOptions);
  });
});