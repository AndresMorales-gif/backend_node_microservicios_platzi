const express = require('express');

const controller = require('./index');
const secure = require('./secure');
const response = require('../../../network/response');

const router = express.Router();

router.get('/', (req, res, next) => {
  controller.list(req.params.id)
    .then(data => {
      response.success(res, data, 200);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  controller.get(req.params.id)
    .then(user => response.success(res, user, 200))
    .catch(next);
});

router.post('/', secure('post'), (req, res, next) => {
  controller.insert(req.body, req.user.id)
    .then((user) => response.success(res, user, 201))
    .catch(next);
});

router.put('/', secure('post'), (req, res, next) => {
  controller.update(req.body, req.user.id)
    .then((user) => response.success(res, user, 201))
    .catch(next);
});

router.delete('/:id', secure('post'), (req, res, next) => {
  controller.remove(req.params.id, req.user.id)
    .then((user) => response.success(res, user, 200))
    .catch(next);
});

module.exports = router;