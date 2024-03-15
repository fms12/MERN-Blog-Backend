const express = require("express");
const connect = require("./config/db");
const { PORT ,COOKIE_DOMAIN} = require("./config/serverConfig");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/index");
const cors = require("cors");
const app = express();

// Middleware to set CORS headers

app.use(
  cors({
    origin: "https://mern-blog-fronted.vercel.app", // This should match the origin of your frontend application
    credentials: true, // This allows cookies to be included in requests
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Use CORS middleware

app.use("/api", apiRoutes);

app.listen(PORT, async () => {
  console.log(`server started at ${PORT}`);
  await connect();
  console.log("Mongo Db connected");
});
