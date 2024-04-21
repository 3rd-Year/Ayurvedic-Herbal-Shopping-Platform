import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Rating, Typography, Button } from "@mui/material";
import { ToastContainer, toast, Flip } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
// import {  } from 'bootstrap';

export default function ProductReview() {
  const { id } = useParams();
  const [rating, setRating] = useState(-1);
  const [description, setDescription] = useState("");

  const user = localStorage.getItem("FName");
  const loggedIn = localStorage.getItem("login");

  const onClickAdd = async (e) => {
    console.log("Login: ", loggedIn);
    if(loggedIn){
      e.preventDefault();

      let reviewObject = {
        productId: id,
        user: user,
        rate: rating,
        description: description,
      };
  
      if (reviewObject.rate == -1 || reviewObject.description == "") {
        toast.warning("Add a rating and a description to add");
      } else {
        try {
          const response = await axios.post(
            "http://localhost:5005/api/review/create",
            reviewObject,
          );
          window.location.reload();
          console.log("Res: ", response);
        } catch (err) {
          console.log(err);
          toast.error(err.response.data.message);
        }
      }
      
    } else {
      toast.info('You need to login first');
    }    
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
        Add Review
      </Button>

      <ToastContainer
				position="top-right"
				autoClose={1000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				transition={Flip}
				pauseOnHover={false}
				theme="colored"
			/>
    </Box>
  );
}
