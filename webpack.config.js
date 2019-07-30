const mode = process.env.NODE_ENV;
const buildType = process.env.BUILD_TYPE;

const merge = require('webpack-merge');

const BUILD_TYPE = require('./build/webpack/constants').BUILD_TYPE;

const baseConfig = require('./build/webpack/base');
const sassConfig = require('./build/webpack/sass');
const scriptsConfig = require('./build/webpack/scripts');
const staticConfig = require('./build/webpack/static');
const devServerConfig = require('./build/webpack/dev-server');
const imagesConfig = require('./build/webpack/images');
const cleanConfig = require('./build/webpack/clean');
const fontsConfig = require('./build/webpack/fonts');

const getConfig = (buildType) => {
  let config = merge(
    baseConfig(buildType),
    scriptsConfig(buildType),
  );

  if (mode === 'development') {
    config = merge(config, devServerConfig());
  } 
  
  if (mode === 'development' || buildType === BUILD_TYPE.MODERN) {
    config = merge(
      config, 
      cleanConfig(),
      staticConfig(),
      imagesConfig(),
      sassConfig(),
      fontsConfig()
    );
  }

  return config;
};

let config;

if (mode === 'development') {
  config = getConfig(buildType);
} else {
  config = [
    getConfig(BUILD_TYPE.MODERN),
    getConfig(BUILD_TYPE.LEGACY)
  ];
}

module.exports = config;