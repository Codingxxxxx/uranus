console.table(require('dotenv').config().parsed);
const express = require('express');
const app = express();
const { connect } = require('mongoose');

const { AppConfig } = require('./const');
const {
  initVite,
  initNunjucks,
  initFileUpload,
  configureAsset,
  configureSession
} = require('./addons');
const adminRoutes = require('./routes/admin');
// const frontRoutes = require('./routes/front');
const {
  injectAdminData,
  checkAdminAuth,
  adminLog,
  handleError500,
  paginationNormalizer
} = require('./middleware');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configure serve asset
configureAsset(app);

// configure session
configureSession(app);

// setup template engine
initNunjucks(app);
initFileUpload(app);

async function startServer() {
  // connect db
  await connect(AppConfig.MONGO_URI)
    .then(() => {
      console.log('Connected to mongodb');
    })
    .catch(error => {
      console.error('Failed to connect to db: ', error);
      throw error;
    });
  // register routes
  // admin
  app.use('/admin', adminLog, checkAdminAuth, paginationNormalizer, injectAdminData, adminRoutes);
  app.use(handleError500);
  if (AppConfig.NODE_ENV === 'development') initVite(app);
  app.listen(AppConfig.PORT, AppConfig.HOST, () => {
    console.info('Server started');
  });
}

startServer();