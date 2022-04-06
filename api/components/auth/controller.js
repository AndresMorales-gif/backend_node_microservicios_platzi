const bcrypt = require('bcrypt')
const nanoid = require('nanoid');

const auth = require('../../../auth');
const error = require('../../../utils/error');

const TABLE = 'auth';
const TABLE_USER = 'user';
const ERROR_CREDENTIALS = 'Invalid information';

const controller = (injectdStore) => {
  const store = injectdStore;

  const getUsername = (username) => store.query(TABLE_USER, { username: username });

  const login = async (username, password) => {
    return store.query(TABLE, { username: username })
      .then((data) => {
        if (data.length === 0) {
          throw error(ERROR_CREDENTIALS)
        }
        return bcrypt.compare(password, data[0].password)
      }).then((isEquals) => {
        if (isEquals) {
          return getUsername(username);
        } else {
          throw error(ERROR_CREDENTIALS);
        }
      }).then((user) => {
        return auth.sign(user[0]);
      });

  }

  const insert = async (body) => store.insert(TABLE, { username: body.username, password: await bcrypt.hash(body.password, 5), id: nanoid.nanoid() });

  const update = async (body) => {
    const data = await store.query(TABLE, { username: body.username });
    return store.update(TABLE, {
      id: data[0].id,
      username: body.username || data[0].username,
      password: body.password ? await bcrypt.hash(body.password, 5) : data[0].password
    });
  };

  return {
    login,
    insert,
    update
  }
};

module.exports = controller;
