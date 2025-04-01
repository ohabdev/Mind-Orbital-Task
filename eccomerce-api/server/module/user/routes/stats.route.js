const statsController = require('../controllers/stats.controller');

module.exports = (router) => {
  router.get(
    '/v1/users/stats',
    Middleware.hasRole('admin'),
    statsController.stats,
    Middleware.Response.success('stats')
  );
};
