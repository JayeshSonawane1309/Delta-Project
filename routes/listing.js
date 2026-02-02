const express = require("express");
const router = express.Router();

// Utils
const wrapAsync = require("../utils/wrapAsync");

//Multer
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

// Middleware
const {isLoggedIn, isOwner, validateListing} = require("../middleware");

//Controllers
const listingController = require("../controllers/listings.js");

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(listingController.create),
  );
// ======================
// INDEX ROUTE
// ======================
// router.get("/", wrapAsync(listingController.index));

// NEW ROUTE
// ======================
router.get("/new", isLoggedIn, wrapAsync(listingController.newForm));

// // CREATE ROUTE
// // ======================
// router.post(
//   "/",
//   isLoggedIn,
//   validateListing,
//   wrapAsync(listingController.create),
// );

router.get("/search", wrapAsync(listingController.search));

// EDIT ROUTE
// ======================
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.edit));

router
  .route("/:id")
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(listingController.update),
  )
  .get(wrapAsync(listingController.show))
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteRoute));

// UPDATE ROUTE
// ======================
// router.put(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   validateListing,
//   wrapAsync(listingController.update),
// );

// ======================
// DELETE ROUTE
// ======================
// router.delete(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   wrapAsync(listingController.deleteRoute),
// );

// ======================
// SHOW ROUTE
// ======================
// router.get("/:id", wrapAsync(listingController.show));

module.exports = router;
