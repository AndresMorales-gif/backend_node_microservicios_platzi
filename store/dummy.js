const db = {
  user: []
};

const list = (table) => {
  return db[table]
};

const get = (table, id) => {
  return list(table).find(item => item.id === id) || null;
};

const insert = (table, data) => {
  list(table).push(data)
};

const remove = (table, id) => {
  const collection = list(table);
  const index = collection.findIndex(item => item.id === id);
  if (index === -1) { return false }
  collection.splice(index, 1);
  return true;
};

module.exports = {
  list,
  get,
  insert,
  remove
}