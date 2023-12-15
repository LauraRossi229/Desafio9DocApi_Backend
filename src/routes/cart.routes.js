import { Router } from "express";
import {
  getCarrito,
  getCarritoById,
  postCarrito,
  postCarritoByProductId,
  deleteById,
  putCarritoByProducId,
  deleteProductById,
  putCarrito,
  postCompra,
} from "../controllers/cart.controllers.js";

const cartsRouter = Router();

cartsRouter.get("/", getCarrito);

cartsRouter.get("/:cid", getCarritoById);

cartsRouter.post("/", postCarrito);

cartsRouter.post("/:cid/products/:pid", postCarritoByProductId);

cartsRouter.delete("/:id", deleteById);

cartsRouter.put("/:cid/products/:pid", putCarritoByProducId);

cartsRouter.delete("/:cid/products/:pid", deleteProductById);

cartsRouter.put("/:cid", putCarrito);

cartsRouter.post("/:cid/purchase", postCompra)

export default cartsRouter;
