const express = require("express");

const ClientController = require("../controllers/clientController");
const ClientRouter = express.Router();

ClientRouter.post("/register", ClientController.register);
ClientRouter.delete("/disable/:id", ClientController.disable);
ClientRouter.put("/update/:id", ClientController.updateClient);

module.exports = ClientRouter;