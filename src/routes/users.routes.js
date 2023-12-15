import { Router } from "express";
import {
  getUsers,
  getUserbyId,
  putUser,
  deleteUser,
} from "../controllers/users.controllers.js";

import { userModel } from "../models/users.models.js";

const userRouter = Router();

userRouter.get(
  "/",
  getUsers /* async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send({ respuesta: "OK", mensaje: users });
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en consultar usuarios", mensaje: error });
  }
} */
);

userRouter.get(
  "/:id",
  getUserbyId /* async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (user) {
      res.status(200).send({ respuesta: "OK", mensaje: user });
    } else {
      res.status(404).send({
        respuesta: "Error en consultar usuario",
        mensaje: "User not Found",
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en consultar usuario", mensaje: error });
  }
} */
);

userRouter.put(
  "/:id",
  putUser /* async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, age, email, password } = req.body;
  try {
    const user = await userModel.findByIdAndUpdate(id, {
      first_name,
      last_name,
      age,
      email,
      password,
    });
    if (user) {
      res.status(200).send({ respuesta: "OK", mensaje: user });
    } else {
      res.status(404).send({
        respuesta: "Error en actualizar usuario",
        mensaje: "User not Found",
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en actualizar usuario", mensaje: error });
  }
} */
);

userRouter.delete(
  "/:id",
  deleteUser /* async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndDelete(id);
    if (user) {
      res.status(200).send({ respuesta: "OK", mensaje: user });
    } else {
      res.status(404).send({
        respuesta: "Error en eliminar usuario",
        mensaje: "User not Found",
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en eliminar usuario", mensaje: error });
  }
} */
);

export default userRouter;
