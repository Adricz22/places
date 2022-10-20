const express = require("express");
const { check } = require("express-validator");
const fileUpload = require("express-fileupload");

const placesControllers = require("../controllers/places-controllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/:pid", placesControllers.getPlaceById);

router.get("/user/:uid", placesControllers.getPlacesByUserId);

router.use(checkAuth);

router.post(
  "/",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesControllers.createPlace
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesControllers.updatePlace
);

router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;
