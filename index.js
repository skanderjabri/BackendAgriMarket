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

const UserRoutes = require("./Routes/UserRoutes")
const ProducteurRoutes = require("./Routes/ProducteurRoutes")
const AcheteurRoutes = require("./Routes/AcheteurRoutes")
const ActualiteRoutes = require("./Routes/ActualiteRoutes")
const ForumCategorieRoutes = require("./Routes/ForumCategorieRoutes")

app.use("/api", bodyParser, ProducteurRoutes)
app.use("/api", bodyParser, AcheteurRoutes)
app.use("/api", bodyParser, UserRoutes)
app.use("/api", bodyParser, ActualiteRoutes)
app.use("/api", bodyParser, ForumCategorieRoutes)
