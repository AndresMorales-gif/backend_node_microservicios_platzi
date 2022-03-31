const db = {
  user: [],
  auth: []
};

const list = async(table) => {
  return db[table]
};

const get = async(table, id) => {
  return (await list(table)).find(item => item.id === id) || null;
};

const insert = async(table, data) => {
  (await list(table)).push(data)
  return data;
};

const remove = async(table, id) => {
  const collection = await list(table);
  const index = collection.findIndex(item => item.id === id);
  if (index === -1) { return false }
  collection.splice(index, 1);
  return true;
};

const update = async(table, data) => {
  const collection = await list(table);
  const index = collection.findIndex(item => item.id === data.id);
  if (index === -1) { return null }
  collection[index] = data;
  return data;
};

const query = async(table, q) => {
  const collection = await list(table);
  const keys = Object.keys(q);
  return collection.filter(item => {
    for (const key of keys) {
      if (q[key] !== item[key]) {
        return false;
      }
    }
    return true;
  })
}

module.exports = {
  list,
  get,
  insert,
  remove,
  update,
  query
}