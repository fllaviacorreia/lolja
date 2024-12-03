const express = require("express");

const ClientController = require("../controllers/clientController");
const ClientRouter = express.Router();

ClientRouter.post("/register", ClientController.create);

module.exports = ClientRouter;