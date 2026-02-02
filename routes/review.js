const express = require("express");
//Router object
const router = express.Router({mergeParams: true});

//Requirements
//Utils Required
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
//Requiring Schemas Joi
const {reviewSchema} = require("../utils/schema.js");

const {isLoggedIn, isReviewAuthor} = require("../middleware");

const reviewController = require("../controllers/reviews.js");

//Review Schema
const validateReview = (req, res, next) => {
  let {error} = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
  } else {
    next();
  }
};

//Reviews Route
//Post Routes
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.create),
);

//Delete Review Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.deleteReview),
);

module.exports = router;
