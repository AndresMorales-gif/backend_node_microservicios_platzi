const nanoid = require('nanoid');

const error = require('../../../utils/error');

const TABLE = 'post';
const ACTION_NOT_ALLOWED = 'No tienes permiso para hacer esto.'

const controller = (injectdStore) => {
  const store = injectdStore || require('../../../store/mysql');

  const list = () => store.list(TABLE);

  const get = (id) => store.get(TABLE, id);

  const insert = async (body, user) => {
    let post = {
      id: nanoid.nanoid(),
      post: body.post,
      user: user
    };
    return store.insert(TABLE, post);
  };

  const remove = async (id, user) => {
    const post = await store.get(TABLE, id);
    if (post.user !== user) {
      throw error(ACTION_NOT_ALLOWED, 400)
    }
    store.remove(TABLE, id);
  };

  const update = async (body, user) => {
    const post = await store.get(TABLE, body.id);

    if (post.user !== user) {
      throw error(ACTION_NOT_ALLOWED, 400)
    }

    return store.update(TABLE, {
      id: post.id,
      post: body.post || post.post,
      user: user
    });
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
