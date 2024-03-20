const express = require("express");
const connect = require("./config/db");
const {
  PORT,
  COOKIE_DOMAIN,
  SECRET,
  MONGO_URL,
} = require("./config/serverConfig");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/index");
const cors = require("cors");
const app = express();

// Middleware to set CORS headers
app.use(customCors)
app.use(
  cors({
    origin: "https://mern-blog-fronted.vercel.app", // This should match the origin of your frontend application
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
    // This allows cookies to be included in requests
  })
);
app.set("trust proxy", 1);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cookieParser());

// Use CORS middleware
app.get("/", (req, res) => {
  res.json({ do: "SMILE", start: "Developing something great & keep :) :)" });
});
app.use("/api", apiRoutes);

app.listen(PORT, async () => {
  console.log(`server started at ${PORT}`);
  await connect();
  console.log("Mongo Db connected");
});
