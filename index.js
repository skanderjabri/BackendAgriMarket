const express = require("express");
const cors = require("cors");
const mongoose = require("./Config/Connect");
const dotenv = require("dotenv");
const UserRoutes = require("./Routes/UserRoutes");
const ProducteurRoutes = require("./Routes/ProducteurRoutes");
const AcheteurRoutes = require("./Routes/AcheteurRoutes");
const ActualiteRoutes = require("./Routes/ActualiteRoutes");
const ForumCategorieRoutes = require("./Routes/ForumCategorieRoutes");
const ForumRoutes = require("./Routes/ForumRoutes");
const ForumCommentRoutes = require("./Routes/ForumCommentRoutes");
const ContactRoutes = require("./Routes/ContactRoutes");

// Load environment variables
dotenv.config();

// Constants
const PORT = process.env.PORT || 8200;

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/public", express.static("public"));

// Test Server
app.get('/testserver', (req, res) => {
    res.json({ msg: "SERVER AGRIMARKET IS RUNNING " });
});

// API Routes
app.use("/api", [
    ProducteurRoutes,
    AcheteurRoutes,
    UserRoutes,
    ActualiteRoutes,
    ForumCategorieRoutes,
    ForumRoutes,
    ForumCommentRoutes,
    ContactRoutes
]);

// Start server
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
