const express = require("express");
const clc = require("cli-color");
const jwt = require("jsonwebtoken");
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

router.post("/auth/register", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.post("/auth/login", (req, res, next) => {
  try {
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

router.get("/get-profile/:id", (req, res, next) => {
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

router.put("/update_gain_weigh/:idt", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

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
