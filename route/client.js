const express = require("express")

const clientController = require("../controller/client")

const clientRouter = express.Router();

clientRouter.get("", (req, res) => {
    try {
        const clients = clientController.getAll();
        console.log(clients);
        return res.status(200).json(clients);
    }catch (e) {
        return res.status(500).json({message: "Erro ao buscar todos os clientes."})
    }
});

module.exports = clientRouter;
