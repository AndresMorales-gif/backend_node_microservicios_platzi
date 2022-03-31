const nanoid = require('nanoid');

const TABLE = 'auth';

const controller = (injectdStore) => {
  const store = injectdStore || require('../../../store/dummy');

  const insert = (body) => store.insert(TABLE, body);

  const update = (body) => store.update(TABLE, body);

  return {
    insert,
    update
  }
};

module.exports = controller;
