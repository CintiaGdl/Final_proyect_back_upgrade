const UserRoutes = require("express").Router();
const { isAdmin, isBasic, isStore } = require("../../middlewares/auth.middleware");
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
UserRoutes.post("/logout", [isBasic], logout);
UserRoutes.get("/:id", [isStore], getUser);
UserRoutes.get("/", [isStore], getAllUsers);
UserRoutes.patch("/favBeverages/:id", [isBasic], addFavBeverage);
UserRoutes.patch("/favDesserts/:id", [isBasic], addFavDessert);
UserRoutes.patch("/favPizzas/:id", [isBasic], addFavPizza);

module.exports = UserRoutes;