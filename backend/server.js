const express = require("express");

const clientsRoutes = require("./src/routes/clientRoute.js");
const productsRoutes = require('./src/routes/productRoutes.js');
const PORT = 4000;

const app = express();
app.use(express.json());

app.use("/clients", clientsRoutes);
app.use('/products', productsRoutes);

app.use("/", (req, res) => {
    return res.send("Api de Gerenciamento")
});
app.listen(PORT, () => {
    console.log("Server running in port " + PORT)
});