const express = require("express");

const {
  addToCart,
  getCart,
  updateQuantity,
  removeFromCart,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/", addToCart);

router.get("/", getCart);

router.patch("/:id", updateQuantity);

router.delete("/:id", removeFromCart);

module.exports = router;