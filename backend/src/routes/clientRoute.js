const express = require("express");

const ClientController = require("../controllers/clientController");
const ClientRouter = express.Router();

ClientRouter.post("/register", ClientController.create);
ClientRouter.delete("/disable/:id", ClientController.innactive);
module.exports = ClientRouter;