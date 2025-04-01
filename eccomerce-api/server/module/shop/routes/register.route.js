const fs = require('fs');
const path = require('path');
const multer = require('multer');
const config = require('../config');
const registerController = require('../controllers/register.controller');

const uploadDocument = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, config.documentDir);
    },
    filename(req, file, cb) {
      const ext = Helper.String.getExt(file.originalname);
      const nameWithoutExt = Helper.String.createAlias(Helper.String.getFileName(file.originalname, true));
      let fileName = `${nameWithoutExt}${ext}`;
      if (fs.existsSync(path.resolve(config.documentDir, fileName))) {
        fileName = `${nameWithoutExt}-${Helper.String.randomString(5)}${ext}`;
      }

      cb(null, fileName);
    },
    fileSize: 10 * 1024 * 1024 // 10MB limit
  })
});

module.exports = (router) => {
  router.post(
    '/v1/shops/register',
    Middleware.loadUser,
    registerController.register,
    Middleware.Response.success('register')
  );

  router.post(
    '/v1/shops/register/document',
    uploadDocument.single('file'),
    registerController.uploadDocument,
    Middleware.Response.success('document')
  );
};
