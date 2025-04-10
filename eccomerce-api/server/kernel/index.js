const http = require('http');
const _ = require('lodash');
const mongoose = require('mongoose');
const Helper = require('./helpers');
const ResponseMiddleware = require('./middlewares/response');
const Logger = require('./services/logger');

class Kernel {

    constructor(config) {

        this.config = config || {};
        this._modelSchemas = {};
        this._mongoosePlugins = {};
        this._routes = [];
        this._agendaJobs = [];
        this._services = {};
        this.httpServer = null;
        this.db = {};
        this.middleware = {
            Response: ResponseMiddleware,
            Request: {}
        }
    }

    addProp(key, val) {
        this[key] = val;
    }

    startHttpServer() {
        const app = http.createServer(this.app);
        app.listen(process.env.PORT, null, () => {
            console.log('Express server listening on %d, in %s mode', process.env.PORT, process.env.NODE_ENV || 'development');
        });
    }

    loadModule(module) {
        if (module.config) {
            this.config = _.defaults(this.config, module.config);
        }
        if (module.core) {
            module.core(this);
        }
        if (module.model) {
            Object.keys(module.model).forEach((modelName) => {
                this._modelSchemas[modelName] = module.model[modelName];
            });
        }
        if (module.mongoosePlugin) {
            Object.keys(module.mongoosePlugin).forEach((modelName) => {
              if (!this._mongoosePlugins[modelName]) {
                this._mongoosePlugins[modelName] = [];
              }
      
              this._mongoosePlugins[modelName].push(module.mongoosePlugin[modelName]);
            });
          }

        if (module.middleware) {
        Object.keys(module.middleware).forEach((name) => {
            this.middleware[name] = module.middleware[name];
        });
        }

        if (module.router) {
            this._routes.push(module.router);
        }
        if (module.services) {
            Object.keys(module.services).forEach((name) => {
              this._services[name] = module.services[name];
            });
        }

    }

    _modelLoader() {
        const db = {};
        Object.keys(this._modelSchemas).forEach((name) => {
            const schema = typeof this._modelSchemas[name] === 'function' ? this._modelSchemas[name]() : this._modelSchemas[name];
            if (schema instanceof mongoose.Schema) {
                if (this._mongoosePlugins[name] && Array.isArray(this._mongoosePlugins[name])) {
                    this._mongoosePlugins[name].forEach(pluginFuncitonFactory => schema.plugin(pluginFuncitonFactory));
                }
                db[name] = mongoose.model(name, schema);
            } else {
                db[name] = schema;
            }
        });

        this.db = db;
    }

    compose() {
        this._modelLoader();

        global.Helper = Helper;
        global.Service = Object.assign(this._services, {
            Logger
        });

        global.DB = this.db;
        global.Middleware = this.middleware;
        global.PopulateResponse = require('./util/populate-response');
        global.Log = require('./util/log');
        this._routes.forEach(route => route(this.app));

        this.app.use(async (err, req, res, next) => {
            const httpCode = err.httpCode || 400;
            const code = err.code || httpCode;
            const data = err.data || null;
            const message = err.message || 'An error occurred, please try again!';
    
            await Service.Logger.create({ req, error: err });
    
            res.status(httpCode).send({
                code,
                message,
                data
            });
            next();
        });
    }

}

function kernelFactory(config) {

    const kernel = new Kernel(config);

    kernel.loadModule(require('./core/express'));
    kernel.loadModule(require('./core/mongoose'));
    kernel.loadModule(require('./models/user'));
    kernel.loadModule(require('./models/log'));

    return kernel;
}

module.exports = kernelFactory;