import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Rating, Typography, Button } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
// import {  } from 'bootstrap';

export default function ProductReview() {
  const { id } = useParams();
  const [rating, setRating] = useState(-1);
  const [description, setDescription] = useState("");

  const user = localStorage.getItem("FName");

  const onClickAdd = async (e) => {
    e.preventDefault();

    let reviewObject = {
      productId: id,
      user: user,
      rate: rating,
      description: description,
    };

    if (reviewObject.rate == -1 || reviewObject.description == "") {
      alert("Fill all the fields");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5005/api/review/create",
          reviewObject,
        );

        console.log("Res: ", response);
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      }
    }

    window.location.reload();
  };
  return (
    <Box
      sx={{
        width: "50%",
        mt: "40px",
        display: "flex",
        justifyContent: "left",
        flexDirection: "column",
        alignItems: "left",
        "& > :not(style)": { m: 1 },
      }}
    >
      <Typography component="legend">Rating</Typography>
      <Rating
        name="simple-controlled"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <TextField
        fullWidth="20"
        Height="20"
        helperText=" "
        id="demo-helper-text-aligned-no-helper"
        label="Description"
        defaultValue={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button variant="contained" onClick={onClickAdd}>
        Add
      </Button>
    </Box>
  );
}
