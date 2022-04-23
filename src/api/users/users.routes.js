const UserRoutes = require("express").Router();
const { isAuth } = require("../../middlewares/auth.middleware");
const { register, 
    login, 
    logout, 
    getUser, 
    addFavBeverage, 
    addFavDessert, 
    addFavPizza, 
    getAllUsers } = require("./users.controller");

UserRoutes.post("/register", register);
UserRoutes.post("/login", login);
UserRoutes.post("/logout", [isAuth], logout);
UserRoutes.get("/:id", [isAuth], getUser);
UserRoutes.get("/", [isAuth], getAllUsers);
UserRoutes.patch("/favProducts", [isAuth], addFavBeverage);
UserRoutes.patch("/favProducts", [isAuth], addFavDessert);
UserRoutes.patch("/favProducts", [isAuth], addFavPizza);

module.exports = UserRoutes;