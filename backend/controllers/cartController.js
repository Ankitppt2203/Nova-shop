const Cart = require("../models/Cart");

function normalizeQuantity(quantity) {
  const parsedQuantity = Number(quantity);
  return Number.isInteger(parsedQuantity) ? parsedQuantity : NaN;
}

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { productId, name, price, image, quantity = 1 } = req.body;
    const normalizedProductId = String(productId || "").trim();
    const normalizedQuantity = normalizeQuantity(quantity);

    if (!normalizedProductId || !name || !image || Number.isNaN(normalizedQuantity) || normalizedQuantity < 1) {
      return res.status(400).json({
        message: "Valid product details and quantity are required",
      });
    }

    const existingProduct = await Cart.findOne({ productId: normalizedProductId });

    if (existingProduct) {
      existingProduct.quantity += normalizedQuantity;
      await existingProduct.save();

      return res.status(200).json(existingProduct);
    }

    const cartItem = await Cart.create({
      productId: normalizedProductId,
      name,
      price,
      image,
      quantity: normalizedQuantity,
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add product to cart",
      error: error.message,
    });
  }
};


// VIEW CART
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch cart",
      error: error.message,
    });
  }
};


// INCREASE / DECREASE QUANTITY
const updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const normalizedQuantity = normalizeQuantity(quantity);

    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    if (Number.isNaN(normalizedQuantity) || normalizedQuantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    cartItem.quantity = normalizedQuantity;

    await cartItem.save();

    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update quantity",
      error: error.message,
    });
  }
};


// REMOVE FROM CART
const removeFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      message: "Product removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to remove product",
      error: error.message,
    });
  }
};


module.exports = {
  addToCart,
  getCart,
  updateQuantity,
  removeFromCart,
};
