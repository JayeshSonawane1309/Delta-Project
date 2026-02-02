const User = require("../models/user.js");

module.exports.signupGet = (req, res) => {
  res.render("users/signupform.ejs");
};

module.exports.signupPost = async (req, res, next) => {
  try {
    let {username, email, password} = req.body;
    const newUser = new User({email, username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    //Automatic login
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to AIRBNB!");
      return res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    return res.redirect("/signup");
  }
};

module.exports.loginGet = (req, res) => {
  res.render("users/loginform.ejs");
};

module.exports.loginPost = (req, res) => {
  req.flash("success", "Welcome back!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  // if (!redirectUrl) {
  //   return res.redirect("/listings");
  // } else {
  //   return res.redirect(res.locals.redirectUrl);
  // }
  return res.redirect(redirectUrl);
};

module.exports.logout = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are Logged Out!");
    return res.redirect("/listings");
  });
};
