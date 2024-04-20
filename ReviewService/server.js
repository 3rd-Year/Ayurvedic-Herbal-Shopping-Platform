import {} from "dotenv/config";
import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import fileUpload from "express-fileupload";

mongoose.connect(
  "mongodb+srv://bugsquashers:OkhaWJH5cjBycehV@ctmdb.gzcbvlh.mongodb.net/AHSP?retryWrites=true&w=majority",
  {
    dbName: "AHSP",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) =>
    err ? console.log(err) : console.log("Connected to Dilla database"),
);

const app = express();
app.use(json());
app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);
app.use(
  fileUpload({
    useTempFiles: true,
  }),
);

const port = process.env.PORT || 5005;

app.listen(port, () => {
  `Server running on port ${port} 🔥`;
  console.log(`Server running on port ${port} 🔥`);
});

import reviewRoute from "./routes/review.js";
import shippingRoute from "./routes/shipping.js";

app.use(reviewRoute);
app.use(shippingRoute);
