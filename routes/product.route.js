const express = require("express");
const jwt = require("jsonwebtoken");
const ProductRoute = express.Router();
const { ProductModel } = require("../models/product.model");

ProductRoute.get("/", async (req, res) => {
  const AllUsers = await ProductModel.find();
  res.send(AllUsers);
});

ProductRoute.get("/:ID", async (req, res) => {
  const { ID } = req.params;
  const product = await ProductModel.findOne({ _id: ID });
  console.log({ product });
  res.send(product);
});

ProductRoute.post("/", async (req, res) => {
  const NewProduct = new ProductModel(req.body);
  await NewProduct.save();
  res.send({ msg: "Product added successfully" });
});

ProductRoute.patch("/:ID", async (req, res) => {
  const { ID } = req.params;

  ProductModel.findByIdAndUpdate(ID, req.body, function (err, docs) {
    if (err) {
      res.send({ msg: "Error in Updating data" });
    } else {
      res.send({ msg: "Product Updated Successfully" });
    }
  });
});

ProductRoute.delete("/:ID", async (req, res) => {
  const { ID } = req.params;
  ProductModel.findByIdAndDelete(ID, function (err, docs) {
    if (err) {
      res.send({ msg: "Error in deleting data" });
    } else {
      res.send({ msg: "Product Deleted Successfully" });
    }
  });
});

// Function to add an array of products
ProductRoute.post("/addMany", async (req, res) => {
  try {
    const products = req.body; // Assuming the products array is sent in the request body

    // Validate the request body to ensure it's an array of objects
    if (!Array.isArray(products)) {
      return res.status(400).send({
        message: "Invalid data format. Expected an array of products.",
      });
    }

    // Insert the products into the database
    const insertedProducts = await ProductModel.insertMany(products);
    res.status(201).send({
      message: "Products added successfully",
      insertedProducts,
    });
  } catch (error) {
    console.error("Error adding products:", error);
    res
      .status(500)
      .send({ message: "An error occurred while adding products." });
  }
});

module.exports = { ProductRoute };
