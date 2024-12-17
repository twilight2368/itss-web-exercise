require("dotenv").config();
const express = require("express");
const clc = require("cli-color");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const MENU = require("./mock/food.json");
const router = express.Router();
const UserModel = require("./models/User");
const ScheduleModel = require("./models/Schedule");
const callHuggingFaceAPI = require("./robots/huggingFaceApi");

//TODO: Middlewares ---------------------------------------------
function errorHandling(err, req, res, next) {
  console.log(clc.red(err.message));
  console.log("====================================");
  console.error(err);
  console.log("====================================");
  return res.status(500).json({
    message: "Something went wrong!!!",
  });
}

function checkJwtFromHeader(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log("====================================");
    console.log(token);
    console.log("====================================");
    if (token == null) return res.sendStatus(401);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("====================================");
    console.log(decoded);
    console.log("====================================");

    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(403).json({ message: "Invalid token" });
  }
}

router.get("/", (req, res, next) => {
  res.json({
    message: "Hello world",
  });
});

router.get("/protected", checkJwtFromHeader, (req, res, next) => {
  res.json({
    message: "Hello world",
  });
});
//TODO: AUTHENTICATIONS ------------------------------------------
router.post("/auth/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existUser = await UserModel.findOne({ email: email });

    if (existUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: savedUser,
      jwt: token,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/auth/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existUser = await UserModel.findOne({ email }).select("+password");

    if (!existUser) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const isMatchPassword = await bcrypt.compare(password, existUser.password);
    if (isMatchPassword) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    const token = jwt.sign({ id: existUser._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    return res.status(201).json({
      message: "User login successfully",
      user: existUser,
      jwt: token,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/auth/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

//TODO: PROFILE ---------------------------------------------------
router.get("/get-profile/:id", checkJwtFromHeader, async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "Successful",
      data: user,
    });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
});

router.put(
  "/change-profile-image/:id",
  checkJwtFromHeader,
  (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/change-profile/:id",
  checkJwtFromHeader,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, email, date_of_birth, phone, position, place_of_work } =
        req.body;

      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        {
          name,
          email,
          date_of_birth,
          phone,
          position,
          place_of_work,
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Send back the updated user information
      res.status(200).json({
        user: updatedUser,
        message: "Update profile successful",
      });
    } catch (error) {
      next(error);
    }
  }
);

//TODO: TARGET ----------------------------------------------------
router.put("/update_health/:id", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.put("/update_lost_weight/:id", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.put("/update_gain_weigh/:id", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

//TODO: NUTRITION --------------------------------------------------

function getRandomItems(arr, num) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

router.get("/menu-day", (req, res, next) => {
  try {
    const lunchItems = getRandomItems(MENU.lunch, 4);
    const dinnerItems = getRandomItems(MENU.dinner, 4);

    res.json({
      data: { lunch: lunchItems, dinner: dinnerItems },
      message: "Successful",
    });
  } catch (error) {
    next(error);
  }
});

const combinedMenu = [...MENU.lunch, ...MENU.dinner];

router.get("/menu-week", (req, res, next) => {
  const { limit = 8 } = req.query;
  try {
    const weekMenu = [];
    const numDays = Math.min(Number(limit), 8);
    for (let i = 0; i < numDays; i++) {
      const randomItems = getRandomItems(combinedMenu, 4); // Get 4 random items from the combined array
      weekMenu.push(randomItems);
    }

    res.json({ data: weekMenu, message: "Successful" });
  } catch (error) {
    next(error);
  }
});

//TODO: SCHEDULE ---------------------------------------------------
router.post("/create-exercise", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

// {
//     "calendarData":[
//   {
//     "date": "2024-12-18",
//     "time_start": "09:00",
//     "time_end": "17:00",
//     "event": "Work"
//   },
// }
router.post("/generate-exercise", async (req, res, next) => {
  try {
    const { calendarData } = req.body; // User's calendar input in JSON format

    if (!calendarData || !Array.isArray(calendarData)) {
      return res.status(400).json({
        error: "Invalid input format. Please provide a valid calendar array.",
      });
    }

    // console.log("====================================");
    // console.log(calendarData);
    // console.log("====================================");

    const schedule = await callHuggingFaceAPI(calendarData);

    if (!schedule) {
      return res.status(400).json({
        error: "Error",
      });
    }

    res.json({
      message: "Successful",
      data: schedule,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/get-schedule/:id", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.use(errorHandling);

module.exports = router;
