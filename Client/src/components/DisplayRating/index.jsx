import { Container, Grid, Rating, Typography } from "@mui/material";
import React from "react";

export default function DisplayRating({ user, rating, description }) {
  console.log("Rate: ", rating);
  return (
    <Container>
      <Grid>
        <Typography>{user}</Typography>
        <Rating value={rating} />
        <Typography variant="body1">{description}</Typography>
      </Grid>
    </Container>
  );
}
