/**
 * Wood Plugin Module.
 * redis queue
 * by jlego on 2018-11-20
 */
const { Util } = require('wood-util')();

class Queue {
  constructor(opts = {}) {
    this.redisDb = opts.redis;
    if(!this.redis) console.warn('Queue Redis 没找到实例');
  }

  push(key, value) {
    // if(typeof value === 'object') value = JSON.stringify(value);
    return new Promise((resolve, reject) => {
      if(!this.redis) throw Util.error('入队失败');
      this.redis.lpush(key, value, (err, reply) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  pop(key, times = 0) {
    return new Promise((resolve, reject) => {
      if(!this.redis) throw Util.error('出队失败');
      this.redis.brpop(key, times, (err, repl) => {
        if (err) reject(err);
        resolve(repl[1]);
      });
    });
  }
}
module.exports = Queue;