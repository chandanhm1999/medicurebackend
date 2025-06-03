const express = require("express");
const jwt = require("jsonwebtoken");
const gridDataSchema = require("../models/gridDataSchema");
const GridDataRoute = express.Router();

// POST route to add multiple items
GridDataRoute.post("/grid-data", async (req, res) => {
  try {
    const result = await gridDataSchema.insertMany(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET route to retrieve all items
GridDataRoute.get("/grid-data", async (req, res) => {
  try {
    const gridData = await gridDataSchema.find();
    res.status(200).json(gridData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { GridDataRoute };
