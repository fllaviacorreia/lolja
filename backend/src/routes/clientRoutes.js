const express = require("express");

const ClientController = require("../controllers/clientController");
const ClientRouter = express.Router();

ClientRouter.post("/register", ClientController.register);
ClientRouter.delete("/disable/:id", ClientController.disable);
ClientRouter.put("/update/:id", ClientController.updateClient);
ClientRouter.get("/:id", ClientController.findById);
ClientRouter.get("/", ClientController.findAllClients);

module.exports = ClientRouter;