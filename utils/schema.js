const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().min(3).max(100).required(),

    description: Joi.string().min(10).required(),

    image: Joi.string()
      .uri()
      .allow("", null)
      .default(
        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg",
      ),

    price: Joi.number().min(1).required(),

    location: Joi.string().min(2).required(),

    country: Joi.string().required(),

    // ✅ ADD THIS
    category: Joi.string()
      .valid("trending", "farm-house", "iconic-cities", "rooms")
      .required(),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().min(3).required(),
  }).required(),
});
