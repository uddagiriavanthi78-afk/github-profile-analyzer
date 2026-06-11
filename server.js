require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const githubRoutes = require("./routes/githubRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "GitHub Profile Analyzer API Running",
  });
});

const PORT = process.env.PORT || 5000;
app.use("/api/github", githubRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
