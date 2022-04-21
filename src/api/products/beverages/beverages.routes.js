const beverageRoutes = require('express').Router();
const {isAuth} = require('../../../middlewares/auth.middleware');
const upload = require('../../../middlewares/updatefile.middleware');

const { getAll, getOne, postOne, patchOne, deleteOne} = require('./beverages.controller');

beverageRoutes.get('/', getAll);
beverageRoutes.get('/:id', getOne);
beverageRoutes.post('/', [isAuth], upload.single('img'), postOne);
beverageRoutes.patch('/:id', [isAuth], upload.single('img'), patchOne);
beverageRoutes.delete('/:id', [isAuth], deleteOne);

module.exports = beverageRoutes;