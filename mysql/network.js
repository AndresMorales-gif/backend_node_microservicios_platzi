const express = require('express');

const store = require('../store/mysql');
const response = require('../network/response');

const router = express.Router();

router.post('/query/:table', (req, res, next) => {
  store.query(req.params.table, req.body.query, req.body.join)
    .then(data => {
      response.success(res, data, 200);
    })
    .catch(next);
});

router.get('/:table', (req, res, next) => {
  store.list(req.params.table)
    .then(data => {
      response.success(res, data, 200);
    })
    .catch(next);
});

router.get('/:table/:id', (req, res, next) => {
  store.get(req.params.table, req.params.id)
    .then(data => response.success(res, data, 200))
    .catch(next);
});

router.post('/:table', (req, res, next) => {
  store.insert(req.params.table ,req.body)
    .then((data) => response.success(res, data, 201))
    .catch(next);
});

router.put('/:table', (req, res, next) => {
  store.update(req.params.table, req.body)
    .then((data) => response.success(res, data, 201))
    .catch(next);
});

router.delete('/:table/:id', (req, res, next) => {
  store.remove(req.params.table, req.params.id)
    .then((data) => response.success(res, data, 200))
    .catch(next);
});

module.exports = router;
