const express = require("express");
const { check } = require("express-validator");
const fileUpload = require("express-fileupload");

const usersController = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", usersController.getUsers);

router.post(
  "/signup",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);

router.post("/login", usersController.login);

module.exports = router;
