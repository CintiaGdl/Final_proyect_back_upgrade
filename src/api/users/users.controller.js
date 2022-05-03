const User = require("./users.model");
const bcrypt = require("bcrypt");
const JwtUtils = require("../../utils/jwt/jwt");
const { setError } = require('../../utils/error/error');
const { validationId } = require('../../utils/validators/validators');


const register = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const userExist = await User.findOne({ email: user.email });
    if (userExist) {
      return next(setError(404, 'This email already exists.'));
    }
    const userDB = await user.save();
    return res.status(201).json(userDB.name);
  } catch (error) {
    return next(setError(404, 'Something was wrong with the register.'));
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(setError(404, 'This email is not register.'));
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = JwtUtils.generateToken(user._id, user.email, user.role);
      return res.status(200).json(token);
    } else {
        return next(setError(404, 'This password is not correct.'))
    }
  } catch (error) {
        return next(setError(404, 'Something was wrong with the login.'))
  }
};

const logout = (req, res, next) => {
  try {
    const token = null;
    return res.status(201).json(token);
  } catch (error) {
    return next(setError(404, 'Something was wrong with the logout, please try again.'));
  }
};

const getUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const parsedToken = token.replace('Bearer ', '');
    const validToken = JwtUtils.verifyToken(parsedToken, process.env.JWT_SECRET);
    const user = await User.findById(validToken.id);
    if (user.role === 'basic') {
      return res.status(200).json(user);
    } else if (user.role === 'store' || user.role === 'admin') {
      const { id } = req.params;
      const user2 = await User.findById(id);
      return res.status(200).json(user2);
      }
  } catch (error) {
      return next(setError(404, 'Cannot get user'))
  }
}

const getAllUsers = async (req, res, next) => {
  try {
      const users = await User.find();
      res.status(200).json(users);
  } catch (error) {
      return next(setError(404, 'Cannot get all users'))
  }
}

const addFavBeverage = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const parsedToken = token.replace('Bearer ', '');
    const validToken = JwtUtils.verifyToken(parsedToken, process.env.JWT_SECRET);
    const user = await User.findById(validToken.id);
    if (user.role === 'basic') {
      user.favBeverages = [...user.favBeverages, ...req.body.favBeverages];
      const updateUser = await User.findByIdAndUpdate(user._id, user);
      return res.status(200).json(updateUser);
    } else if (user.role === 'store' || user.role === 'admin') {
      const { id } = req.params;
      const user2 = await User.findById(id);
      user2.favBeverages = [...user2.favBeverages, ...req.body.favBeverages];
      const updateUser2 = await User.findByIdAndUpdate(user2._id, user2);
      return res.status(200).json(updateUser2);
      }
  } catch (error) {
      return next(setError(404, 'It was not possible add this beverage to favorite list.'));
  }
} 

const addFavDessert = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const parsedToken = token.replace('Bearer ', '');
    const validToken = JwtUtils.verifyToken(parsedToken, process.env.JWT_SECRET);
    const user = await User.findById(validToken.id);
    if (user.role === 'basic') {
      user.favDesserts = [...user.favDesserts, ...req.body.favDesserts];
      const updateUser = await User.findByIdAndUpdate(user._id, user);
      return res.status(200).json(updateUser);
    } else if (user.role === 'store' || user.role === 'admin') {
      const { id } = req.params;
      const user2 = await User.findById(id);
      user2.favDesserts = [...user2.favDesserts, ...req.body.favDesserts];
      const updateUser2 = await User.findByIdAndUpdate(user2._id, user2);
      return res.status(200).json(updateUser2);
      }
  } catch (error) {
      return next(setError(404, 'It was not possible add this dessert to favorite list.'));
  }
} 

const addFavPizza = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const parsedToken = token.replace('Bearer ', '');
    const validToken = JwtUtils.verifyToken(parsedToken, process.env.JWT_SECRET);
    const user = await User.findById(validToken.id);
    if (user.role === 'basic') {
      user.favPizzas = [...user.favPizzas, ...req.body.favPizzas];
      const updateUser = await User.findByIdAndUpdate(user._id, user);
      return res.status(200).json(updateUser);
    } else if (user.role === 'store' || user.role === 'admin') {
      const { id } = req.params;
      const user2 = await User.findById(id);
      user2.favPizzas = [...user2.favPizzas, ...req.body.favPizzas];
      const updateUser2 = await User.findByIdAndUpdate(user2._id, user2);
      return res.status(200).json(updateUser2);
      }
  } catch (error) {
      return next(setError(404, 'It was not possible add this pizza to favorite list.'));
  }
} 

const patchOneUser = async (req, res, next) => {
  try {

    /* const token = req.headers.authorization;
    const parsedToken = token.replace('Bearer ', '');
    const validToken = JwtUtils.verifyToken(parsedToken, process.env.JWT_SECRET);
    const user = await User.findById(validToken.id);
    if (user.role === 'basic') {
      const {name} = req.body;
      const updateUser = await User.findByIdAndUpdate(user._id, user);
      return res.status(200).json(updateUser);
    } else if (user.role === 'store' || user.role === 'admin') {
      const {name} = req.params;
      const { id } = req.params;
      const user2 = await User.findById(id);
      const updateUser2 = await User.findByIdAndUpdate(user2._id, user2);
      return res.status(200).json(updateUser2);
      } */

      const {id} = req.params;
      const user = new User(req.body);
      user.favBeverages = req.body.favBeverages;
      user.favDesserts = req.body.favDesserts;
      user.favPizzas = req.body.favPizzas;
      user._id = id;
      const updateUser = await User.findByIdAndUpdate(id, user);
      return res.status(200).json(updateUser);

  } catch (error) {
      return next(setError(400, 'Cannot update user'));
  }
}

const deleteOneUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    return res.status(200).json(user);
  } catch (error) {
    return next(setError(400, "Cannot delete user"));
  }
};

const deleteFavPizzas = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    user.favPizzas = user.favPizzas
    return res.status(200).json(user);
  } catch (error) {
    return next(setError(400, "Cannot delete user"));
  }
};

module.exports = { 
  register, 
  login, 
  logout, 
  getUser, 
  addFavBeverage, 
  addFavDessert, 
  addFavPizza, 
  getAllUsers,
  deleteOneUser,
  patchOneUser
 };