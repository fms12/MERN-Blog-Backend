const express = require("express");
const connect = require("./config/db");
const { PORT } = require("./config/serverConfig");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/index");
const cors = require("cors");
const app = express();

// Middleware to set CORS headers

app.use(
  cors({
    origin: "http://localhost:3000", // Adjust this to match your frontend's origin
    credentials: true,// This allows cookies to be included in requests
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Use CORS middleware


app.use("/api", apiRoutes);

app.listen(8080, async () => {
  console.log(`server started at ${process.env.PORT}`);
  await connect();
  console.log("Mongo Db connected");
});
