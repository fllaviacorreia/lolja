const express = require("express");

const PurchaseController = require('../controllers/purchaseController');
const PurchaseRouter = express.Router();

PurchaseRouter.post("/register", PurchaseController.register);
PurchaseRouter.get("/", PurchaseController.findAllPurchases)
module.exports = PurchaseRouter;