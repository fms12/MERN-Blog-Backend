const express = require("express");
const connect = require("./config/db");
const { PORT } = require("./config/serverConfig");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/index");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );
app.use("/api", apiRoutes);

app.listen(8080, async () => {
  console.log(`server started at ${process.env.PORT}`);
  await connect();
  console.log("Mongo Db connected");
});
