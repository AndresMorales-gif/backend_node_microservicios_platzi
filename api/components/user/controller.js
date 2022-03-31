const nanoid = require('nanoid');

const auth = require('../auth')

const TABLE = 'user';
const ERROR_USER_DUPLICATE = 'User already exists';
const USER_NOT_EXIST = 'User does not exist'

const controller = (injectdStore) => {
  const store = injectdStore || require('../../../store/dummy');

  const list = () => store.list(TABLE);

  const get = (id) => store.get(TABLE, id);

  

  const insert = async (body) => {
    const userOld = await store.query(TABLE, {username: body.username});
    if (userOld.length > 0) {
      throw new Error(ERROR_USER_DUPLICATE);
    }
    console.log(auth);
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
      throw new Error(USER_NOT_EXIST)
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
      username: body.username
    })
  };

  return {
    list,
    get,
    insert,
    remove,
    update,
  }
};

module.exports = controller;
