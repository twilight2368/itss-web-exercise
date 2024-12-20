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
const moment = require("moment");
const callHuggingFaceAPI2 = require("./robots/huggingFaceApi2");

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

// Update "health_improve" target
router.put("/update_health/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { description, time_start, time_end, evaluate } = req.body;

    // Find the user and update the health_improve target
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields for health_improve
    user.target.health_improve.description =
      description || user.target.health_improve.description;
    user.target.health_improve.time_start =
      time_start || user.target.health_improve.time_start;
    user.target.health_improve.time_end =
      time_end || user.target.health_improve.time_end;
    user.target.health_improve.evaluate =
      evaluate || user.target.health_improve.evaluate;

    await user.save();

    res.status(200).json({
      message: "Health improvement target updated successfully",
      user: user,
    });
  } catch (error) {
    next(error);
  }
});

// Update "loss_weight" target
router.put("/update_loss_weight/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { description, crr_w, init_w, target_w, time_start, time_end } =
      req.body;

    // Find the user and update the loss_weight target
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields for loss_weight
    user.target.loss_weight.description =
      description || user.target.loss_weight.description;
    user.target.loss_weight.crr_w = crr_w || user.target.loss_weight.crr_w;
    user.target.loss_weight.init_w = init_w || user.target.loss_weight.init_w;
    user.target.loss_weight.target_w =
      target_w || user.target.loss_weight.target_w;
    user.target.loss_weight.time_start =
      time_start || user.target.loss_weight.time_start;
    user.target.loss_weight.time_end =
      time_end || user.target.loss_weight.time_end;

    await user.save();

    res.status(200).json({
      message: "Loss weight target updated successfully",
      user: user,
    });
  } catch (error) {
    next(error);
  }
});

// Update "gain_weight" target
router.put("/update_gain_weight/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { description, crr_w, init_w, target_w, time_start, time_end } =
      req.body;

    // Find the user and update the gain_weight target
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields for gain_weight
    user.target.gain_weight.description =
      description || user.target.gain_weight.description;
    user.target.gain_weight.crr_w = crr_w || user.target.gain_weight.crr_w;
    user.target.gain_weight.init_w = init_w || user.target.gain_weight.init_w;
    user.target.gain_weight.target_w =
      target_w || user.target.gain_weight.target_w;
    user.target.gain_weight.time_start =
      time_start || user.target.gain_weight.time_start;
    user.target.gain_weight.time_end =
      time_end || user.target.gain_weight.time_end;

    await user.save();

    res.status(200).json({
      message: "Gain weight target updated successfully",
      user: user,
    });
  } catch (error) {
    next(error);
  }
});

// Update "health_improve" target to active
router.put("/update_health_active/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Find user by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update targets: only "health_improve" is active
    user.target.health_improve.isActive = true;
    user.target.gain_weight.isActive = false;
    user.target.loss_weight.isActive = false;

    // Save the updated user
    await user.save();

    res.status(200).json({
      message: "Health improvement target activated successfully",
      user: user,
    });
  } catch (error) {
    next(error);
  }
});

// Update "loss_weight" target to active
router.put("/update_lost_weight_active/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Find user by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update targets: only "loss_weight" is active
    user.target.health_improve.isActive = false;
    user.target.gain_weight.isActive = false;
    user.target.loss_weight.isActive = true;

    // Save the updated user
    await user.save();

    res.status(200).json({
      message: "Loss weight target activated successfully",
      user: user,
    });
  } catch (error) {
    next(error);
  }
});

// Update "gain_weight" target to active
router.put("/update_gain_weight_active/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Find user by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update targets: only "gain_weight" is active
    user.target.health_improve.isActive = false;
    user.target.loss_weight.isActive = false;
    user.target.gain_weight.isActive = true;

    // Save the updated user
    await user.save();

    res.status(200).json({
      message: "Gain weight target activated successfully",
      user: user,
    });
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

// Create a new exercise schedule
router.post("/create-exercise", async (req, res, next) => {
  try {
    const { user_id, time_start, duration_in_minutes, value } = req.body;

    // Validate input
    if (!user_id || !time_start || !duration_in_minutes || !value) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Parse and validate time_start
    const start = moment(time_start);

    if (!start.isValid()) {
      return res.status(400).json({ message: "Invalid date format." });
    }

    if (duration_in_minutes < 10 || duration_in_minutes > 90) {
      return res.status(400).json({
        message: "Duration must be between 10 and 90 minutes.",
      });
    }

    // Calculate time_end based on duration
    const end = moment(start).add(duration_in_minutes, "minutes");

    console.log("====================================");
    console.log(start.toDate());
    console.log(end.toDate());
    console.log("====================================");

    // Create new schedule entry
    const newSchedule = new ScheduleModel({
      user: user_id,
      time_start: start.toDate(),
      time_end: end.toDate(),
      duration_in_minutes,
      value,
    });

    await newSchedule.save();

    // Fetch all schedules for the user
    const userSchedules = await ScheduleModel.find({ user: user_id })
      .select("-user")
      .sort({
        time_start: 1,
      });

    // Respond with schedules and success message
    res.status(201).json({
      message: "Successful",
      schedules: userSchedules,
    });
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
    const { user_id, calendarData } = req.body; // User's calendar input in JSON format

    if (!calendarData || !Array.isArray(calendarData)) {
      return res.status(400).json({
        message: "Invalid input format. Please provide a valid calendar array.",
      });
    }


    const schedule = await callHuggingFaceAPI(calendarData);

    if (!schedule) {
      return res.status(400).json({
        error: "Error",
      });
    }

    console.log("====================================");
    console.log(schedule);
    console.log("====================================");

    const formattedSchedule = schedule.map((item) => {
      // Parse and adjust time with UTC+7
      const timeStart = moment(
        `${item.date} ${item.time_start}`,
        "YYYY-MM-DD HH:mm"
      );
      const timeEnd = moment(
        `${item.date} ${item.time_end}`,
        "YYYY-MM-DD HH:mm"
      );

      // Calculate duration in minutes
      const durationInMinutes = timeEnd.diff(timeStart, "minutes");

      console.log("====================================");
      console.log(timeStart.toDate());
      console.log(timeEnd.toDate());
      console.log("====================================");

      return {
        user: user_id,
        time_start: timeStart.toDate(),
        time_end: timeEnd.toDate(),
        value: item.exercise,
        duration_in_minutes: durationInMinutes,
      };
    });

    // console.log("====================================");
    // console.log(formattedSchedule);
    // console.log("====================================");

    const resultSchedule = await ScheduleModel.insertMany(formattedSchedule);

    // console.log("====================================");
    // console.log(resultSchedule);
    // console.log("====================================");

    const newSchedules = await ScheduleModel.find({ user: user_id }).sort({
      time_Start: 1,
    });

    console.log("====================================");
    console.log(newSchedules);
    console.log("====================================");

    if (!newSchedules.length) {
      return res.status(500).json({
        message: "Something went wrong",
        schedules: [],
      });
    }

    res.json({
      message: "Successful",
      schedules: newSchedules,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/generate-exercise-basic", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

// Get all schedules for a specific user
router.get("/schedule/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Fetch schedules for the user
    const userSchedules = await ScheduleModel.find({ user: userId }).sort({
      time_start: 1,
    });

    if (!userSchedules.length) {
      return res.status(200).json({
        message: "No schedules found for this user.",
        schedules: [],
      });
    }

    res.status(200).json({
      message: "Schedules retrieved successfully.",
      schedules: userSchedules,
    });
  } catch (error) {
    next(error);
  }
});

// Get all schedules for a specific user
router.get("/schedule-history/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Get the current date/time in UTC+7
    const now = moment().utcOffset(7).toDate(); // Get current time in UTC+7 and convert to a Date object

    // Fetch schedules for the user that have already passed (time_start < current time)
    const userSchedules = await ScheduleModel.find({
      user: userId,
      time_end: { $lt: now }, // Only get schedules where time_start is less than the current time
    })
      .sort({ time_start: -1 }) // Sort by most recent past schedule first
      .limit(9)
      .select("value time_start");

    if (!userSchedules.length) {
      return res.status(200).json({
        message: "No past schedules found for this user.",
        schedules: [],
      });
    }

    res.status(200).json({
      message: "Past schedules retrieved successfully.",
      schedules: userSchedules,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/recommend/:lang", async (req, res, next) => {
  try {
    const { lang } = req.params; // User's calendar input in JSON format

    const response = await callHuggingFaceAPI2(lang);

    if (!response) {
      return res.status(400).json({
        error: "Error",
      });
    }

    res.json({
      message: "Successful",
      data: response,
    });
  } catch (error) {
    next(error);
  }
});

router.use(errorHandling);

module.exports = router;
