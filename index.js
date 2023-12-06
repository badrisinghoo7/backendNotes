const express = require("express");
const { connection } = require("./db");
const app = express();
require("dotenv").config();
const { userRouter } = require("./route/user.route");
const { noteRouter } = require("./route/note.route");

app.use(express.json());

app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.get("/", (req, res) => {
  res.send({ msg: "This is the home page for testing the server" });
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to database");
    console.log(`Listening on port ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
