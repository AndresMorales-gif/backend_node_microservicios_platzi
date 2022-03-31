const auth = require('../../../auth');

const TABLE = 'auth';
const TABLE_USER = 'user';

const controller = (injectdStore) => {
  const store = injectdStore || require('../../../store/dummy');

  const getUsername = (username) => store.query(TABLE_USER, {username: username});

  const login = async(username, password) => {
    const data = await store.query(TABLE, {username: username});
    if (data.length && data[0].password === password) {
      console.log('aca');
      const user = await getUsername(username);
      console.log(user);
      return auth.sign(user[0]);
    }
    throw new Error('Error');
  }

  const insert = (body) => store.insert(TABLE, body);

  const update = async(body) => {
    const data = await store.query(TABLE, {username: body.username});
    return store.update(TABLE, {
      id: data[0].id,
      username: body.username || data[0].username,
      password: body.password || data[0].password
    });
  };

  return {
    login,
    insert,
    update
  }
};

module.exports = controller;
