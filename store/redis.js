const redis = require('redis');
const config = require('../config');
const client = redis.createClient({
  host: config.cacheService.redisHost,
  port: config.cacheService.redisPort,
  password: config.cacheService.redisPass
});

const list = (table) => {
  return new Promise((resolve, reject) => {
    client.get(table, (err, data) => {
      if (err) return reject(err);
      return resolve(data ? JSON.parse(data) : null);
    });
  });
};

const get = (table, id) => {
  return new Promise((resolve, reject) => {
    client.get(`${table}_${id}`, (err, data) => {
      if (err) return reject(err);
      return resolve(data ? JSON.parse(data) : null);
    });
  });
};

const insert = async (table, data) => {
  let key = table;
  if (data && data.id) {
    key = key + '_' + data.id;
  }

  client.setex(key, 10, JSON.stringify(data));
  return true;
};


module.exports = {
  list,
  get,
  insert
}