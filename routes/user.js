const express = require("express");
//Router object
const router = express.Router({mergeParams: true});

//Passport
const passport = require("passport");

const {saveRedirectUrl} = require("../middleware.js");

//Utils Required
const wrapAsync = require("../utils/wrapAsync.js");

const userController = require("../controllers/users.js");

router
  .route("/signup")
  .get(userController.signupGet)
  .post(wrapAsync(userController.signupPost));

router
  .route("/login")
  .get(userController.loginGet)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.loginPost,
  );

router.get("/logout", userController.logout);

module.exports = router;
