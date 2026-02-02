const mongoose = require("mongoose");
const {data} = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/airbnb");
}

main()
  .then(() => {
    console.log("Database connected successfully named airbnb");
  })
  .catch((err) => {
    console.error("Database connection failed");
    console.error(err);
  });

const categories = ["trending", "farm-house", "iconic-cities", "rooms"];

const initDB = async () => {
  await Listing.deleteMany({});
  let newData = data.map((obj) => ({
    ...obj,
    owner: "6979ae3d4b587fc13d35ab84",
    category: categories[Math.floor(Math.random() * categories.length)],
  }));
  await Listing.insertMany(newData);
  console.log("Data was initialised");
};

initDB();
