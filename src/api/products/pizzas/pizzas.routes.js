const pizzasRoutes = require("express").Router();
const { isAuth } = require("../../../middlewares/auth.middleware");
const upload = require("../../../middlewares/updatefile.middleware");

const {
  getAll,
  getOne,
  postOne,
  patchOne,
  deleteOne,
} = require("./pizzas.controller");

pizzasRoutes.get("/", getAll);
pizzasRoutes.get("/:id", getOne);
pizzasRoutes.post("/", [isAuth], upload.single("img"), postOne);
pizzasRoutes.patch("/:id", [isAuth], upload.single("img"), patchOne);
pizzasRoutes.delete("/:id", [isAuth], deleteOne);

module.exports = pizzasRoutes;