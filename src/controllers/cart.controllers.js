import { cartModel } from "../models/cart.models.js";
import { productModel } from "../models/products.models.js";
import { ticketModel } from "../models/ticket.models.js";
import { userModel } from "../models/users.models.js";


export const getCarrito = async (req, res) => {
  const { limit } = req.query;
  try {
    const carts = await cartModel.find().limit(limit);
    res.status(200).send({ respuesta: "ok", mensaje: carts });
  } catch (error) {
    res.status(400).send({ respuesta: "Error", mensaje: error });
  }
};

export const getCarritoById = async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await cartModel.findOne({ "mensaje._id": id });

    if (cart) {
      res.status(200).send({ respuesta: "OK", mensaje: cart });
    } else {
      res.status(404).send({
        respuesta: "Error en consultar el carrito",
        mensaje: "Not Found",
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en consultar el carrito", mensaje: error });
  }
};

export const postCarrito = async (req, res) => {
  try {
    const cart = await cartModel.create({});
    res.status(200).send({ respuesta: "OK", mensaje: cart });
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en crear el carrito", mensaje: error });
  }
};

export const postCarritoByProductId = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await cartModel.findById(cid);

    if (!cart) {
      res.status(404).json({
        respuesta: "Error al agregar producto al carrito",
        mensaje: "Carrito no encontrado",
      });
    }

    const product = await productModel.findById(pid);

    if (!product) {
      res.status(404).send({
        respuesta: "Error al agregar producto al carrito",
        mensaje: "Producto no encontrado",
      });
    }

    const indice = cart.products.findIndex((prod) => prod.id_prod === pid);

    if (indice !== -1) {
      cart.products[indice].quantity = quantity;
    } else {
      cart.products.push({ id_prod: pid, quantity: quantity });
    }

    const response = await cartModel.findByIdAndUpdate(cid, cart);

    res.status(200).send({
      respuesta: "OK",
      mensaje: "Producto agregado al carrito",
      carrito: response, // Opcional: puedes enviar el carrito actualizado como respuesta
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      respuesta: "Error",
      mensaje: "Ha ocurrido un error en el servidor",
    });
  }
};

export const deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await cartModel.findById(id);

    if (!cart) {
      res.status(404).send({
        respuesta: "Error al agregar producto al carrito",
        mensaje: "Carrito no encontrado",
      });
    }

    cart.products = [];
    await cart.save();

    res.status(200).send({
      respuesta: "OK",
      mensaje: "Productos eliminados del carrito",
      carrito: cart,
    });
  } catch (error) {
    res.status(500).send({
      respuesta: "Error",
      mensaje: "Ha ocurrido un error en el servidor",
    });
  }
};

export const putCarritoByProducId = async (reque, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await cartModel.findById(cid);

    if (!cart) {
      res.status(404).send({
        respuesta: "Carrito no encontrado",
        mensaje: "Not Found",
      });
    }

    const product = await productModel.findById(pid);

    if (!product) {
      res.status(404).send({
        respuesta: "Producto no encontrado",
        mensaje: "Not Found",
      });
    }

    const indice = cart.products.findIndex(
      (prod) => prod.id_prod._id.toString() === pid
    );

    if (indice !== -1) {
      cart.products[indice].quantity = quantity;
    } else {
      cart.products.push({ id_prod: pid, quantity: quantity });
    }

    await cart.save();

    res.status(200).send({
      respuesta: "OK",
      mensaje: "Carrito actualizado",
      carrito: cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      respuesta: "Error",
      mensaje: "Ha ocurrido un error en el servidor",
    });
  }
};

export const deleteProductById = async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const cart = await this.findById(cid);
    if (!cart) {
      res.status(404).send({
        respuesta: "Carrito no encontrado",
        mensaje: "Not Found",
      });
    }

    const product = await productModel.findById(pid);
    if (!product) {
      res.status(404).send({
        respuesta: "Producto no encontrado",
        mensaje: "Not Found",
      });
    }

    const index = cart.products.findIndex(
      (prod) => prod.id_prod._id.toString() === pid
    );
    if (index !== -1) {
      cart.products.splice(index, 1);
    } else {
      res.status(404).send({
        respuesta: "Producto no encontrado en carrito",
        mensaje: "Not Found",
      });
    }

    await cart.save();

    res.status(200).send({ respuesta: "OK", mensaje: "Product removed" });
  } catch (error) {
    res
      .status(error.message.includes("not found") ? 404 : 400)
      .send({ respuesta: "Error", mensaje: error.message });
  }
};

export const putCarrito = async (req, res) => {
  const { cid } = req.params;
  const productsArray = req.body.products;

  try {
    const cart = await cartModel.findById(cid);

    if (!cart) {
      return res.status(404).json({
        respuesta: "Error",
        mensaje: "Carrito no encontrado",
      });
    }

    if (!Array.isArray(productsArray)) {
      return res.status(400).json({
        respuesta: "Error",
        mensaje: "Los productos deben estar en un arreglo",
      });
    }

    const updatedProducts = [];

    for (let prod of productsArray) {
      const product = await productModel.findById(prod.id_prod);

      if (!product) {
        return res.status(404).json({
          respuesta: "Error",
          mensaje: `Producto con ID ${prod.id_prod} no encontrado`,
        });
      }

      const existingProductIndex = cart.products.findIndex(
        (cartProduct) => cartProduct.id_prod.toString() === prod.id_prod
      );

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity = prod.quantity;
      } else {
        cart.products.push({
          id_prod: prod.id_prod,
          quantity: prod.quantity,
        });
      }

      updatedProducts.push({
        id_prod: prod.id_prod,
        quantity: prod.quantity,
      });
    }

    await cart.save();

    return res.status(200).json({
      respuesta: "OK",
      mensaje: "Carrito actualizado exitosamente",
      productosActualizados: updatedProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      respuesta: "Error",
      mensaje: "Ha ocurrido un error en el servidor",
    });
  }
};
export const postCompra = async (req, res) => {
  const cartId = req.params.cid;

  try {
    const cart = await cartModel.findById(cartId).populate("products.id_prod");

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    let totalAmount = 0; // Inicializa el monto total a cero

    const productsNotProcessed = [];

    for (const item of cart.products) {
      const product = item.id_prod;
      const requestedQuantity = item.quantity;

      if (product.stock >= requestedQuantity) {
        product.stock -= requestedQuantity;
        await product.save();

        // Suma al monto total el precio del producto por la cantidad
        totalAmount += product.price * requestedQuantity;
      } else {
        productsNotProcessed.push(product._id);
      }
    }

    // No es necesario asignar el monto total al carrito

    cart.products = cart.products.filter(
      (cartItem) => !productsNotProcessed.includes(cartItem.id_prod._id)
    );

    await cart.save();

    // Obtén el usuario asociado con el carrito
    const user = await userModel.findOne({ cart: cartId }).exec();

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
   
    console.log("Monto total de la compra:", totalAmount);
    console.log("Usuario", user.email);

    const ticket = new ticketModel({
      amount: totalAmount, // Usa el monto total calculado
      purchaser: user.email,
    
    });
    

    await ticket.save();
    console.log("ticket:", ticket.code )
    console.log("fecha:", ticket.purchase_datetime)

    return res.status(200).json({
      message: "Compra finalizada exitosamente",
      productsNotProcessed: productsNotProcessed,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al procesar la compra" });
  }
};
