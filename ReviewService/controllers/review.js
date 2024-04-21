import Review from "../models/review.js";
import mongoose from "mongoose";

const reviewController = {
  createReview: async (req, res) => {
    try {
      console.log("Req Body: ", req.body);
      const { productId, user, rate, description } = req.body;  // Corrected from id to productId
  
      // Convert rate to a number if it's a string
      const numericRate = parseInt(rate, 10);
      if (!numericRate && numericRate !== 0) {  // Checks for NaN which means rate was not a valid number
        return res.status(400).json({ msg: "Invalid rate value." });
      }
  
      if (!productId || numericRate === -1 || !description) {
        console.log("Validation Error - Missing fields");
        return res.status(400).json({ msg: "Please fill in all fields correctly." });
      }
  
      const newReview = new Review({
        productId: productId,  // Changed from id to productId
        user: user,
        rate: numericRate,  // Use the numeric value
        discription: description
      });
  
      console.log("New Review: ", newReview);
  
      await newReview.save();
      res.status(201).json({ msg: "Review added successfully!" });
    } catch (err) {
      console.error("Failed to create review: ", err);
      return res.status(500).json({ message: err.message });
    }
  },

  getReviews: async (req, res) => {
    try {
      const { productId } = req.query;  // Destructure productId from query
  
      if (!productId) {
        return res.status(400).json({ message: "Product ID is required." });
      }
  
      // Ensure productId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid Product ID." });
      }
  
      const reviews = await Review.find({ productId: mongoose.Types.ObjectId(productId) });
  
      res.status(200).json({ data: reviews });
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      res.status(500).json({ message: error.message });
    }
  },

  getOneReview: async (req, res) => {
    const id = req.params.id;
    try {
      const review = await Review.findOne({ _id: id });
      res.json({ message: "Review fetch success", data: review });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  updateReview: async (req, res) => {
    try {
      const id = req.params.id;
      const { rating, discription } = req.body;

      await Review.findOneAndUpdate({ _id: id }, { rating, discription });
      res.json({
        message: "Review update success",
        data: { rating, discription },
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  deleteReview: async (req, res) => {
    try {
      const id = req.params.id;

      await Review.findByIdAndDelete({ _id: id });
      res.json({ message: "delete success !" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};
export default reviewController;
