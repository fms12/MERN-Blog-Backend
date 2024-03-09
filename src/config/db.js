const mongoose = require("mongoose");
const {MONGO_URL} = require("./serverConfig")

const connect = async () => {
  await mongoose.connect(process.env.MONGO_URL);
};

module.exports = connect;
