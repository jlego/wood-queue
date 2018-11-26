/**
 * Wood Plugin Module.
 * redis queue
 * by jlego on 2018-11-20
 */
class Queue {
  constructor(opts = {}) {
    this.redis = opts.redis;
    this.ctx = opts.ctx;
    if(!this.redis) console.warn('Queue Redis 没找到实例');
  }

  push(listkey, value) {
    return new Promise((resolve, reject) => {
      if(!this.redis) throw this.ctx.error('入队失败');
      this.redis.lpush(listkey, value, (err, reply) => {
        if (err) reject(err);
        resolve(value);
      });
    });
  }

  pop(listkey, times = 0) {
    return new Promise((resolve, reject) => {
      if(!this.redis) throw this.ctx.error('出队失败');
      this.redis.brpop(listkey, times, (err, repl) => {
        if (err) reject(err);
        resolve(repl[1]);
      });
    });
  }
}
module.exports = Queue;
