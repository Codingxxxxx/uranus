console.table(require('dotenv').config().parsed);
const express = require('express');
const app = express();

const { AppConfig } = require('./const');
const { initVite, initNunjucks, initFileUpload, configureAsset } = require('./addons');
const adminRoutes = require('./routes/admin');
// const frontRoutes = require('./routes/front');
const { injectAdminData } = require('./middleware');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configure serve asset
configureAsset(app);

// setup template engine
initNunjucks(app);
initFileUpload(app);

async function startServer() {
  // register routes
  // admin
  app.use('/admin', injectAdminData, adminRoutes);
  // front
  // app.use(frontRoutes);
  if (AppConfig.NODE_ENV === 'development') initVite(app);
  app.listen(AppConfig.PORT, AppConfig.HOST, () => {
    console.info('Server started');
  });
}

startServer();