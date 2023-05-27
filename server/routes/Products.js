//* All routes related to Product's

const express = require("express");
const Products = require("../models/ProductSchema");
const router = express.Router();

//* Route 1  -  Adding Products

/**
 * @description Add Product
 * @route POST /addproduct
 * @access Public
 * @requires productSlug (string), other fields (as per the productSchema)
 * @returns Saved product object (JSON)
 */

router.post("/addproduct", async (req, res) => {
  try {
    const { productSlug, ...data } = req.body;

    const existingSlug = await Products.findOne({ productSlug }); //productSlug should be unique

    if (existingSlug) {
      return res.status(409).json({ message: "productSlug already exists" });
    }

    // Create a new product object based on the schema
    const newProduct = new Products({ ...data, productSlug });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct); // Return the saved product as a response
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Failed to add product" });
  }
});
module.exports = router;
