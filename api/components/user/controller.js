const nanoid = require('nanoid');

const auth = require('../auth')

const TABLE = 'user';

const controller = (injectdStore) => {
  const store = injectdStore || require('../../../store/dummy');

  const list = () => store.list(TABLE);

  const get = (id) => store.get(TABLE, id);

  const insert = async (body) => {
    let user = {
      id: nanoid.nanoid(),
      name: body.name,
      username: body.username
    }
    await auth.insert({
      password: body.password,
      username: body.username,
      id: user.id
    })
    return store.insert(TABLE, user);
  }

  const remove = (id) => store.remove(TABLE, id);

  const update = async (body) => {
    if (body.password || body.username) {
      await auth.update({
        password: body.password,
        username: body.username,
        id: user.id
      })
    }
    return store.update(TABLE, body)
  };

  return {
    list,
    get,
    insert,
    remove,
    update
  }
};

module.exports = controller;
