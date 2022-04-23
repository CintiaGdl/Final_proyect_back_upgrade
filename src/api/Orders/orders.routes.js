const orderRoutes = require('express').Router();
const {isAuth} = require('../../middlewares/auth.middleware');
const { getAll, getOne, postOne, patchOne, deleteOne} = require('./orders.controller');

orderRoutes.get('/', [isAuth],getAll);
orderRoutes.get('/:id', [isAuth],getOne);
orderRoutes.post('/', [isAuth], postOne);
orderRoutes.patch('/:id', [isAuth], patchOne);
orderRoutes.delete('/:id', [isAuth], deleteOne);

module.exports = orderRoutes;