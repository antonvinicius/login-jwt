const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((data) => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Error connecting to database");
  });
