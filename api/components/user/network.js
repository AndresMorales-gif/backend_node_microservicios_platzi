const express = require('express');

const secure = require('./secure');
const controller = require('./index');
const response = require('../../../network/response');

const router = express.Router();

router.get('/:id/followers', (req, res, next) => {
  controller.followers(req.params.id)
    .then(data => {
      response.success(res, data, 200);
    })
    .catch(next);
});

router.get('/:id/following',  (req, res, next) => {
  controller.following(req.params.id)
    .then(data => response.success(res, data, 200))
    .catch(next);
});

router.post('/follow/:id', secure('follow'),(req, res, next) => {
  controller.follow(req.user.id, req.params.id)
    .then(data => {
      response.success(res, data, 201);
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  controller.list()
    .then(list => response.success(res, list, 200))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  controller.get(req.params.id)
    .then(user => response.success(res, user, 200))
    .catch(next);
});

router.post('/', (req, res, next) => {
  controller.insert(req.body)
    .then((user) => response.success(res, user, 201))
    .catch(next);
});

router.put('/', secure('update'), (req, res, next) => {
  controller.update(req.body)
    .then((user) => {
      if (user) {
        response.success(res, user, 200)
      } else {
        response.error(res, 'Error', 400);
      }
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  controller.remove(req.params.id)
    .then((isSuccess) => {
      if (isSuccess) {
        response.success(res, 'Ok', 200);
      } else {
        response.error(res, 'Error', 400);
      }
    })
    .catch(next);
});

module.exports = router;