const router = require("express").Router();
const Review = require("../models/review");

// Add review
router.route("/add").post(async (req, res) => {
    const rating = req.body.rating;
    const description = req.body.description;
   
  
    const newReview = new Review({
      rating,
      description,
      
    });
  
    try {
      await newReview.save();
      res.status(200).json("Thank you for your feed back");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Sorry" });
    }
  });


//Display Reviews
  router.route("/").get(async (req, res) => {
    try {
      const reviews = await Review.find();
      res.status(200).json(reviews);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error getting reviews" });
    }
  });


// Delete review
router.route("/delete/:id").delete(async (req, res) => {
  const reviewId = req.params.id;

  try {
    await review.findByIdAndDelete(deviceId);
    res.status(200).json({ status: "deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error deleting" });
  }
});

module.exports = router;