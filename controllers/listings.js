const Listing = require("../models/listing");

// Requiring Mapbox
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({accessToken: mapToken});

module.exports.index = async (req, res) => {
  const {category} = req.query;
  let allListings;
  if (category) {
    allListings = await Listing.find({category});
  } else {
    allListings = await Listing.find({});
  }
  res.render("listings/index", {allListings, category});
};

module.exports.newForm = async (req, res) => {
  return res.render("listings/create.ejs");
};

module.exports.create = async (req, res) => {
  // 1️⃣ Destructure listing data
  const listingData = req.body.listing;

  // 2️⃣ Geocode location
  const geoResponse = await geocodingClient
    .forwardGeocode({
      query: listingData.location,
      limit: 1,
    })
    .send();

  // Safety check
  if (!geoResponse.body.features.length) {
    req.flash("error", "Invalid location");
    return res.redirect("/listings/new");
  }

  // 3️⃣ Create new listing
  const newListing = new Listing(listingData);

  // 4️⃣ Save owner
  newListing.owner = req.user._id;

  // 5️⃣ Save image (from multer + cloudinary)
  if (req.file) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  // 6️⃣ Save geometry
  newListing.geometry = geoResponse.body.features[0].geometry;

  // 7️⃣ Save to DB
  await newListing.save();

  // 8️⃣ Redirect
  req.flash("success", "New Listing Created Successfully!");
  res.redirect("/listings");
};

module.exports.edit = async (req, res) => {
  const {id} = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }

  let orignalImageUrl = listing.image.url;
  orignalImageUrl = orignalImageUrl.replace("/upload", "/upload/c_fill,w_250");
  // console.log(orignalImageUrl);
  return res.render("listings/edit.ejs", {listing, orignalImageUrl});
};

module.exports.update = async (req, res) => {
  const {id} = req.params;

  let listing = await Listing.findByIdAndUpdate(
    id,
    {...req.body.listing},
    {runValidators: true, new: true},
  );
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
  }

  req.flash("success", "Listing updated successfully!");
  return res.redirect(`/listings/${id}`);
};

module.exports.deleteRoute = async (req, res) => {
  const {id} = req.params;

  await Listing.findByIdAndDelete(id);

  req.flash("success", "Listing deleted successfully!");
  return res.redirect("/listings");
};

module.exports.show = async (req, res) => {
  const {id} = req.params;

  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  //   console.log(listing);
  if (!listing) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }

  return res.render("listings/show.ejs", {listing});
};

module.exports.search = async (req, res) => {
  const {q} = req.query;

  let allListings = [];

  if (q && q.trim() !== "") {
    allListings = await Listing.find({
      $or: [
        {title: {$regex: q, $options: "i"}},
        {location: {$regex: q, $options: "i"}},
        {country: {$regex: q, $options: "i"}},
      ],
    });
  }

  res.render("listings/index.ejs", {allListings});
};
