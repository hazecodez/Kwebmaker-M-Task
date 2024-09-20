const express = require("express");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const sequelize = require("./config/database")
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
    app.listen(5000, () => console.log("Server is running on port 5000"));
  })
  .catch((err) => console.error("Database sync error:", err));
