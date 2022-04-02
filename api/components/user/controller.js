const nanoid = require('nanoid');

const auth = require('../auth')
const error = require('../../../utils/error');

const TABLE = 'user';
const TABLE_FOLLOW = 'user_follow';
const ERROR_USER_DUPLICATE = 'User already exists';
const USER_NOT_EXIST = 'User does not exist'

const controller = (injectdStore) => {
  const store = injectdStore || require('../../../store/mysql');

  const list = () => store.list(TABLE);

  const get = (id) => store.get(TABLE, id);



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
    console.log(user);

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
