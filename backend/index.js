require("dotenv").config();
const app = require("./src/app.js");
const clc = require("cli-color");
const mongoose = require("mongoose");
const PORT = process.env.PORT;
const UserModel = require("./src/models/User");
const ScheduleModel = require("./src/models/Schedule");

const connectMongo = async () => {
  try {
    console.log(clc.blue("Connecting to MongoDB ..."));

    await mongoose.connect(process.env.DB_CONNECT_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("====================================");
    console.log(clc.green("Connection MongoDB Success"));
    console.log("====================================");
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    console.log("====================================");
    console.log(clc.red("Connection MongoDB failed"));
    console.log("====================================");
  }
};

const initSystem = async () => {
  try {
    await connectMongo();
    app.listen(PORT, () => {
      console.log("====================================");
      console.log(
        "Server is listen on: " + clc.green("http://localhost:" + PORT)
      );
      console.log("====================================");
    });
  } catch (error) {
    console.log("====================================");
    console.error(error);
    console.log("====================================");
  }
};

initSystem();
