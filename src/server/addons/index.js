module.exports = {
  initVite: require('./vite.addon').initViteDev,
  initNunjucks: require('./nunjucks.addon').initNunjucks,
  initFileUpload: require('./file-upload.addon').initFileUpload,
  configureAsset: require('./asset.addon')
};