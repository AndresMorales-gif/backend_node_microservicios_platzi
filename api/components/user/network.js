const express = require('express');

const response = require('../../../network/response')
const controller = require('./index');

const router = express.Router();

router.get('/', (req, res) => {
  controller.list()
    .then(list => response.success(res, list, 200))
    .catch(error => response.error(res, error.message, 500));
});

router.get('/:id', (req, res) => {
  controller.get(req.params.id)
    .then(user => response.success(res, user, 200))
    .catch(error => response.error(res, error.message, 500));
});

router.post('/', (req, res) => {
  controller.insert(req.body)
    .then((user) => response.success(res, user, 200))
    .catch(error => response.error(res, error.message, 500));
});

router.put('/', (req, res) => {
  controller.update(req.body)
    .then((user) => {
      if (user) {
        response.success(res, user, 200)
      } else {
        response.error(res, 'Error', 400);
      }
    })
    .catch(error => response.error(res, error.message, 500));
});

router.delete('/:id', (req, res) => {
  controller.remove(req.params.id)
    .then((isSuccess) => {
      if (isSuccess) {
        response.success(res, 'Ok', 200);
      } else {
        response.error(res, 'Error', 400);
      }
    })
    .catch(error => response.error(res, error.message, 500));
});

module.exports = router;