const express = require("express");
const cors = require('cors');
const clientsRoutes = require("./src/routes/clientRoutes.js");
const productsRoutes = require('./src/routes/productRoutes.js');
const purchaseRoutes = require('./src/routes/purchaseRoutes.js');
const PORT = 4000;

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
}));
app.use("/clients", clientsRoutes);
app.use('/products', productsRoutes);
app.use('/purchases', purchaseRoutes);

app.use("/", (req, res) => {
    return res.send("Api de Gerenciamento")
});
app.listen(PORT, () => {
    console.log("Server running in port " + PORT)
});