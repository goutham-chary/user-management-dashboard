require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const usersRouter = require("./routes/users");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);

app.get("/test", (req, res) => res.json({ status: "ok" }));

app.use(errorHandler);

(async () => {
  try {
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (err) {
    console.error("Unable to start server:", err);
    process.exit(1);
  }
})();
