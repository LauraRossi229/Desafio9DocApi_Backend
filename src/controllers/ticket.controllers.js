import { cartModel } from "../models/cart.models";
import { ticketModel } from "../models/ticket.models";
import { productModel } from "../models/products.models";

export const postCompra = async (req, res) => {
  const cartId = req.params.cid;

  try {
    // Verifica que cartId esté presente
    if (!cartId) {
      return res.status(400).json({ message: "ID de carrito no proporcionado" });
    }

    // Busca el carrito por ID
    const cart = await cartModel.findById(cartId).populate("items.product");

    // Verifica que cart esté presente y tenga userEmail
    if (!cart || !cart.userEmail) {
      return res.status(400).json({ message: "Carrito o usuario no válido" });
    }

    const productsNotProcessed = [];

    for (const item of cart.items) {
      const product = item.product;
      const requestedQuantity = item.quantity;

      if (product.stock >= requestedQuantity) {
        product.stock -= requestedQuantity;
        await product.save();
      } else {
        productsNotProcessed.push(product._id);
      }
    }

    cart.items = cart.items.filter(
      (cartItem) => !productsNotProcessed.includes(cartItem.product._id)
    );
    await cart.save();

    const ticket = new ticketModel({
      amount: cart.total,
      purchaser: cart.userEmail,
    });

    // Verifica que purchaser esté presente antes de intentar guardar
    if (!ticket.purchaser) {
      return res.status(400).json({ message: "Usuario no válido para la compra" });
    }

    await ticket.save();

    return res.status(200).json({
      message: "Compra finalizada exitosamente",
      productsNotProcessed: productsNotProcessed,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al procesar la compra" });
  }
};
