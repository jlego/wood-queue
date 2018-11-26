/**
 * Wood Plugin Module.
 * redis queue
 * by jlego on 2018-11-20
 */
const Queue = require('./src/queue');

module.exports = (app = {}, config = {}) => {
  let redisPlugin = app.Plugin('redis'),
    redisDb = null,
    _queues = new Map();
  if(redisPlugin && redisPlugin.Redis && redisPlugin.Redis.db){
    redisDb = redisPlugin.Redis.db;
  }
  app.Queue = function(queueName, options = {}) {
    if(!_queues.has(queueName)){
      _queues.set(queueName, new Queue({redis: redisDb, ctx: app, options }));
    }
    return _queues.get(queueName);
  }
  if(app.addAppProp) app.addAppProp('Queue', app.Queue);
  return app;
}
