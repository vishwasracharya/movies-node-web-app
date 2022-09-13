const redis = require('redis');

let redisClient;
(async () => {
  redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  });

  redisClient.on('connect', () => console.log('Redis client connected'));
  redisClient.on('error', (err) => console.log(`Something went wrong ${err}`));

  await redisClient.connect();
})();

module.exports = redisClient;
