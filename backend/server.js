const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const cartRoutes = require("./routes/cartRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "NOVA Shop Backend is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

if (!process.env.MONGO_URI) {
  console.warn("MONGO_URI is not set. Cart requests will fail until it is configured.");
} else {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((error) => {
      console.error("MongoDB connection failed:");
      console.error(error.message);
    });
}
