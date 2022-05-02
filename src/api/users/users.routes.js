const UserRoutes = require("express").Router();
const { isAdmin, isBasic, isStore } = require("../../middlewares/auth.middleware");
const { register, 
    login, 
    logout, 
    getUser, 
    addFavBeverage, 
    addFavDessert, 
    addFavPizza, 
    getAllUsers,
    deleteOneUser
 } = require("./users.controller");

UserRoutes.post("/register", register);
UserRoutes.post("/login", login);
UserRoutes.post("/logout", [isBasic], logout);
UserRoutes.get("/:id", [isBasic], getUser);
UserRoutes.get("/", [isStore], getAllUsers);
UserRoutes.patch("/:id", [isBasic], addFavBeverage);
UserRoutes.patch("/favDesserts/:id", [isBasic], addFavDessert);
UserRoutes.patch("/favPizzas/:id", [isBasic], addFavPizza);
UserRoutes.delete("/:id", [isAdmin], deleteOneUser);

module.exports = UserRoutes;