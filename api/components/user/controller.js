const nanoid = require('nanoid');

const auth = require('../auth')
const error = require('../../../utils/error');

const TABLE = 'user';
const TABLE_FOLLOW = 'user_follow';
const ERROR_USER_DUPLICATE = 'User already exists';
const USER_NOT_EXIST = 'User does not exist'

const controller = (injectdStore, injetedCache) => {
  const store = injectdStore;
  const cache = injetedCache;

  const list = async () => {
    let users = await cache.list(TABLE);
    if (!users) {
      users = await store.list(TABLE);
      cache.insert(TABLE, users)
    }
    return users;
  };

  const get = async (id) => {
    let user = await cache.get(TABLE, id);
    if (!user) {
      user = await store.get(TABLE, id);
      cache.insert(TABLE, user)
    }
    return user;
  };

  const insert = async (body) => {
    const userOld = await store.query(TABLE, { username: body.username });
    if (userOld.length > 0) {
      throw error(ERROR_USER_DUPLICATE, 400);
    }
    let user = {
      id: nanoid.nanoid(),
      name: body.name,
      lastname: body.lastname || '',
      username: body.username || ''
    }
    await auth.insert({
      password: body.password,
      username: body.username,
      id: user.id
    })
    return store.insert(TABLE, user);
  };

  const remove = (id) => store.remove(TABLE, id);

  const update = async (body) => {
    const user = await store.get(TABLE, body.id);

    if (!user) {
      throw error(USER_NOT_EXIST, 400)
    }

    if (body.password) {
      await auth.update({
        password: body.password,
        username: user.username,
        id: body.id
      })
    }

    return store.update(TABLE, {
      id: body.id,
      name: body.name || user.name,
      lastname: body.lastname || user.lastname,
      username: user.username
    })
  };

  const follow = (from, to) => store.insert(TABLE_FOLLOW,
    { user_from: from, user_to: to });

  const followers = (to) => store.query(TABLE_FOLLOW,
    { user_to: to }, { table: TABLE, value: 'user_from' });

  const following = (from) => store.query(TABLE_FOLLOW,
    { user_from: from }, { table: TABLE, value: 'user_to' });

  return {
    list,
    get,
    insert,
    remove,
    update,
    follow,
    followers,
    following
  }
};

module.exports = controller;
