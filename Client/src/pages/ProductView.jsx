import { Container, Grid, Stack, Typography, Button, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";
import axios from "axios";
import ProductReview from "../components/review";
import DisplayRating from "../components/DisplayRating";

const ProductView = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [review, setReview] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = React.useState(false);

  const loggedIn = localStorage.getItem("login");

  useEffect(() => {
    axios
      .get(`http://localhost:5003/api/product/get/${id}`)
      .then((response) => {
        setProduct(response.data.data);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  }, [id]);

  useEffect(() => {
    if (!id) {
      console.log("Product ID is missing");
      return;
    }

    axios
      .get(`http://localhost:5005/api/review/getAll?productId=${id}`)
      .then((response) => {
        setReview(response.data.data);  // Make sure the response has the data in `data.data`
      })
      .catch((error) => {
        console.log("An unknown error occurred");
      });
  }, [id]);  // Dependency array now depends on productId

  const handleDelete = async (id) => {
    if (loggedIn) {
      try {
        axios
          .delete(`http://localhost:5005/api/review/delete/${id}`)
          .then((res) => {
            window.location.reload();
          });
        // console.log(data);
        setOpen(false);
        // toast.success(res.data.message, {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
      } catch (error) {
        setOpen(false);
        // toast.error(error.response.data.message, {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
      }
    } else {
      toast.info('You need to login first');
    }

  };

  console.log("ssss", product);
  console.log(review);
  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }} spacing={5}>
      <Typography align="center" variant="h3">
        Product View
      </Typography>
      <hr color="black"></hr>
      <Grid container sx={{ mt: 5 }} spacing={5}>
        <Grid item xs={12} md={6}>
          <img
            src={product?.productImage}
            height={"350px"}
            alt="productimage"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack>
            {/* <Typography>Product Name</Typography> */}
            <Typography variant="h4">{product?.name}</Typography>
          </Stack>

          <Stack>
            {/* <Typography>Product Name</Typography> */}
            <Typography sx={{ mt: "1rem" }} variant="h6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis
              lobortis consequat eu, quam etiam at quis ut convallis.
            </Typography>
          </Stack>
          <Button
            variant="contained"
            color="error"
            sx={{ mt: "5rem" }}
            onClick={() => {
              if (loggedIn) {
                addToCart(product);
              } else {
                toast.info('You need to login first');
              }
            }}
          >
            Add Cart
          </Button>
        </Grid>
      </Grid>
      <Grid spacing={2} container>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ mt: "5rem" }}
          style={{ borderRight: "2px black solid" }}
        >
          <Typography variant="h6">Reviews</Typography>
          {review?.map((review, index) => (
            <Box
              sx={{ mt: 5, mb: 5, mr: 5 }}
              style={{
                backgroundColor: "#e0e0e0",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <DisplayRating
                    key={index}
                    user={review?.user}
                    description={review?.discription}
                    rating={review?.rate}
                  />
                </Grid>
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item>
                      {/* <Typography variant="inherit" sx={{color:"green"}}>Change</Typography> */}
                    </Grid>
                    <Grid item>
                      <Button
                        variant="inherit"
                        sx={{ color: "red" }}
                        onClick={() => handleDelete(review?._id)}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Grid>

        <Grid item xs={12} md={6}>
          <ProductReview />
        </Grid>
      </Grid>

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
    </Container>
  );
};

export default ProductView;
