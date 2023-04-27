const mongoose = require("mongoose");

const review = new mongoose.Schema(
	{
		rating: { type: String, required: true },
		description: { type: String, required: true },
	}
);

module.exports = mongoose.model("reviews", review);
