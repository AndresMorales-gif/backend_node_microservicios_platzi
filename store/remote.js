const request = require('request');

const createRemoteDB = (host, port) => {
  const URL = host + ':' + port;

  const req = (method, urlTable, data) => {
    let url = URL + '/db/' + urlTable;
    let body = data ? JSON.stringify(data) : '';
    return new Promise((resolve, reject) => {
      request({
        method,
        headers: {
          'content-type': 'application/json'
        },
        url,
        body,
      }, (err, req, body) => {
        if (err) {
          console.error('Error con la base de datos remota', err);
          return reject(err.message);
        }

        const resp = JSON.parse(body);
        return resolve(resp.body);
      })
    })
  };

  const list = (table) => {
    return req('GET', table);
  };
  const get = (table, id) => {
    return req('GET', table + '/' + id);
  };
  const insert = (table, data) => {
    return req('POST', table, data);
  };
  const update = (table, data) => {
    return req('PUT', table, data);
  };
  const remove = (table, id) => {
    return req('DELETE', table + '/' + id)
  };
  const query = (table, q, join) => {
    return req('POST', 'query/'+table, { query: q, join: join })
  };

  return {
    list,
    get,
    insert,
    update,
    remove,
    query
  }
};

module.exports = createRemoteDB;