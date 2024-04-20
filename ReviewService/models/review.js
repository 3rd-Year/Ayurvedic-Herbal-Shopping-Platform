import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ReviewSchema = new Schema({
  user: {
    type: String,
  },
  rate: {
    type: Number,
  },
  discription: {
    type: String,
  },
});

export default model("Review", ReviewSchema);
