const express = require("express");
const cors = require("cors");
const mongoose = require("./Config/Connect");
const app = express();
const bodyParser = require("body-parser").urlencoded({ extended: true });
app.use("/public", express.static("public"));
app.use(express.json());
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT || 8200;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});

const ProducteurRoutes = require("./Routes/ProducteurRoutes")
app.use("/api", bodyParser, ProducteurRoutes)
