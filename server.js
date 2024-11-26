const express = require("express");

const clientsRoutes = require("./route/client.js");
const productsRoutes = require("./route/product.js");
const PORT = 4000;

const app = express();

app.use("/clients", clientsRoutes);

app.use("/products", productsRoutes);

app.use("/", (req, res) => {
    return res.send("Api de Gerenciamento")
});
app.listen(PORT, () => {
    console.log("Server running in port " + PORT)
});