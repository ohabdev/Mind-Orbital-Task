exports.model = {
  UserSocial: require('./models/user-social')
};

exports.mongoosePlugin = require('./mongoosePlugin');

exports.services = {
  User: require('./services/User')
};

exports.router = (router) => {
  require('./routes/stats.route')(router);
  require('./routes/user.route')(router);
};
