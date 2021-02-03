require("dotenv").config();
require("./database/connection");
const express = require("express");
const app = express();

const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");

app.use("/user", express.json(), userRouter);
app.use("/admin", adminRouter);

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
