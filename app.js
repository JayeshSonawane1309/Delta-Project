if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8000;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
//Passport
const passport = require("passport");
const LocalStrategy = require("passport-local");

// Utilities
const ExpressError = require("./utils/ExpressError");

// Session & Flash
const session = require("express-session");
const MongoStore = require("connect-mongo").default;

const flash = require("connect-flash");
const User = require("./models/user.js");

// Routes
const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user.js");

// ======================
// TEMPLATE ENGINE SETUP
// ======================
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ======================
// MIDDLEWARE
// ======================
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ======================
// DATABASE CONNECTION
// ======================
//Databases URL
const dbURL = process.env.ATLASDB_URL;
async function main() {
  await mongoose.connect(dbURL);
}

main()
  .then(() => {
    console.log("Database connected successfully named airbnb");
  })
  .catch((err) => {
    console.error("Database connection failed");
    console.error(err);
  });

// ======================
// SESSION CONFIG
// ======================
const store = MongoStore.create({
  mongoUrl: dbURL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600, // 24 hours
});

store.on("error", function (err) {
  console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());
//Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ======================
// FLASH MIDDLEWARE
// ======================
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// ROUTES
//Router used
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
// ======================
// 404 HANDLER
// ======================
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not Found"));
});

// ======================
// ERROR HANDLER
// ======================
app.use((err, req, res, next) => {
  const {statusCode = 500} = err;
  res.status(statusCode).render("error.ejs", {err});
});

// ======================
// SERVER
// ======================
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/listings`);
});
