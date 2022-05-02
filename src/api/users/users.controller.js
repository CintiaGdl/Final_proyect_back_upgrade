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
      const { id } = req.params;
      const user = await User.findById(id);
      if (validationId(req.headers.user, user)) {
          return next(setError(404, 'This action is not allowed.'))
      }
      res.status(200).json(user);
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
      const { id } = req.params;
      const user = await User.findById(id);
      user.favBeverages = [...user.favBeverages, ...req.body.favBeverages];
      const updateUser = await User.findByIdAndUpdate(user._id, user);
      return res.status(200).json(updateUser);
  } catch (error) {
      return next(setError(404, 'It was not possible add this beverage to favorite list.'));
  }
} 

const addFavDessert = async (req, res, next) => {
  try {
      const { id } = req.params;
      const user = await User.findById(id);
      user.favDesserts = [...user.favDesserts, ...req.body.favDesserts];
      const updateUser = await User.findByIdAndUpdate(user._id, user);
      return res.status(200).json(updateUser);
  } catch (error) {
      return next(setError(404, 'It was not possible add this dessert to favorite list.'));
  }
} 

const addFavPizza = async (req, res, next) => {
  try {
      const { id } = req.params;
      const user = await User.findById(id);
      user.favPizzas = [...user.favPizzas, ...req.body.favPizzas];
      const updateUser = await User.findByIdAndUpdate(user._id, user);
      return res.status(200).json(updateUser);
  } catch (error) {
      return next(setError(404, 'It was not possible add this pizza to favorite list.'));
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

module.exports = { 
  register, 
  login, 
  logout, 
  getUser, 
  addFavBeverage, 
  addFavDessert, 
  addFavPizza, 
  getAllUsers,
  deleteOneUser
 };