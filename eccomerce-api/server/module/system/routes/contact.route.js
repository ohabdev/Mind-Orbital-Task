const contactController = require('../controllers/contact.controller');

module.exports = (router) => {
  router.post(
    '/v1/contact',
    contactController.send,
    Middleware.Response.success('send')
  );
};
