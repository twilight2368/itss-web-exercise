require("dotenv").config();
const express = require("express");
const clc = require("cli-color");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const UserModel = require("./models/User");
const ScheduleModel = require("./models/Schedule");

function errorHandling(err, req, res, next) {
  console.log(clc.red(err.message));
  console.log("====================================");
  console.error(err);
  console.log("====================================");
  return res.status(500).json({
    message: "Something went wrong!!!",
  });
}

function checkJwtFromCookie(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }
  try {
    const decoded = jwt.verify(token, "your_secret_key");
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification error:", err.message);
    return res.status(403).json({ message: "Invalid token" });
  }
}

router.get("/", (req, res, next) => {
  res.json({
    message: "Hello world",
  });
});



//TODO: AUTHENTICATIONS
router.post("/auth/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existUser = await UserModel.findOne({ email });

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

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 24 * 3600000,
      sameSite: "strict",
    });

    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    return res.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword,
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

    const existUser = await UserModel.findOne({ email });

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

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 24 * 3600000,
      sameSite: "strict",
    });

    const { password: _, ...userWithoutPassword } = existUser.toObject();

    return res.status(201).json({
      message: "User login successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/auth/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

//TODO: PROFILE
router.get("/get-profile/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const user = UserModel.findById(id);

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
    next(error);
  }
});

router.put("/change-profile-image/:id", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.put("/change-profile/:id", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

//TODO: TARGET
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

//TODO: NUTRITION
router.get("/menu-day", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.get("/menu-week", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

//TODO: SCHEDULE
router.post("/create-exercise", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.post("/create-exercise-import", (req, res, next) => {
  try {
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
