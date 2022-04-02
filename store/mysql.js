const mysql = require('mysql');

const config = require('../config');

const dbConfg = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
}

let connection;

const handleCon = () => {
  connection = mysql.createConnection(dbConfg);
  connection.connect((err) => {
    if (err) {
      console.log('[db err]', err);
      setTimeout(handleCon, 2000);
    } else {
      console.log('DB connected');
    }
  });

  connection.on('error', err => {
    console.log('[db err]', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleCon();
    } else {
      throw err;
    }
  });
};

handleCon();

const list = (table) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
};

const get = (table, id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id = '${id}'`, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data.length > 0 ? data[0] : null);
    });
  });
};

const insert = (table, data) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const remove = async (table, id) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM ${table} WHERE id = '${id}'`, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const update = (table, data) => {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const query = (table, q, join) => {
  return new Promise((resolve, reject) => {
    let joinQ = '';
    if (join) {
      joinQ = `JOIN ${join.table} ON ${table}.${join.value} = ${join.table}.id`;
    }

    connection.query(`SELECT * FROM ${table} ${joinQ} WHERE ?`, q, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
};

module.exports = {
      list,
      get,
      insert,
      remove,
      update,
      query
    }