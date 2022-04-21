const dessertRoutes = require('express').Router();
const {isAuth} = require('../../../middlewares/auth.middleware');
const upload = require('../../../middlewares/updatefile.middleware');

const { getAll, getOne, postOne, patchOne, deleteOne} = require('./desserts.controller');

dessertRoutes.get('/', getAll);
dessertRoutes.get('/:id', getOne);
dessertRoutes.post('/', [isAuth], upload.single('img'), postOne);
dessertRoutes.patch('/:id', [isAuth], upload.single('img'), patchOne);
dessertRoutes.delete('/:id', [isAuth], deleteOne);

module.exports = dessertRoutes;