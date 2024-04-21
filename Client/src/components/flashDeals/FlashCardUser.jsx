import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import { useNavigate } from "react-router-dom";
const SampleNextArrow = (props) => {
	const { onClick } = props;
	return (
		<div className="control-btn" onClick={onClick}>
			<button className="next">
				<i className="fa fa-long-arrow-alt-right"></i>
			</button>
		</div>
	);
};
const SamplePrevArrow = (props) => {
	const { onClick } = props;
	return (
		<div className="control-btn" onClick={onClick}>
			<button className="prev">
				<i className="fa fa-long-arrow-alt-left"></i>
			</button>
		</div>
	);
};
const FlashCardUser = ({ productItems, addToCart }) => {
	const [open, setOpen] = React.useState(false);
	let navigate = useNavigate();
	const [count, setCount] = useState(0);
	const [product, setProduct] = React.useState([]);
	const [productImage, setImage] = React.useState(false);
	const [deleteId, setDeleteId] = useState();

	const loggedIn = localStorage.getItem("login");

	// const UpdateProduct =(id)=>{
	//   navigate (`/edit/${id}`)
	// }

	// const productDetails = (id) =>{
	//   navigate (`/productDetails/${id}`)
	// }

	const handleOpen = (Did) => {
		setOpen(true);
		setDeleteId(Did);
	};
	const handleClose = () => setOpen(false);

	useEffect(() => {
		const getPrducts = async () => {
			await axios
				.get(`http://localhost:5003/api/product/getAll`)
				.then((res) => {
					console.log(res);
					setProduct(res.data.data);
				})
				.catch((err) => {
					console.log(
						"🚀 ~ file: index.jsx:252 ~ getAllCategory ~ err",
						err.massage,
					);
				});
		};

		getPrducts();
	});
	const increment = () => {
		setCount(count + 1);
	};
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};
	const handleDelete = async (did) => {
		try {
			const res = await axios.delete(
				`http://localhost:5003/api/Product/delete/${did}`,
			);
			console.log(res.data);
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
	};
	return (
		<>
			{/* <ToastContainer /> */}
			<Slider {...settings}>
				{product.map((product) => {
					console.log("product map", product);
					return (
						<div className="box">
							<div className="product mtop">
								<div className="img">
									<span className="discount">
										20% Off
									</span>
									<img
										src={product.productImage}
										alt=""
										className="img"
										style={{
											width: "250px",
											objectFit: "contain",
										}}
										onClick={() =>
											navigate(
												`/product/view/${product._id}`,
											)
										}
									/>
									<div className="product-like">
										<label>{count}</label> <br />
										<i
											className="fa-regular fa-heart"
											onClick={increment}></i>
									</div>
								</div>
								<div className="product-details">
									<h3>{product.name}</h3>
									<div className="rate">
										<i className="fa fa-star"></i>
										<i className="fa fa-star"></i>
										<i className="fa fa-star"></i>
										<i className="fa fa-star"></i>
										<i className="fa fa-star"></i>
									</div>
									<div className="price">
										<h4>Rs{product.price}.00 </h4>
										{/* step : 3  
                     if hami le button ma click garryo bahne 
                    */}
										{/* <button onClick={() => UpdateProduct(product._id)}>
                      <i className='fa fa-pencil'></i>
                    </button> */}

										<button
											onClick={() => {
												if (loggedIn) { addToCart(product); } else {
													toast.info('You need to login first');
												}
											}}
										>
											<i className="fa fa-plus"></i>
										</button>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</Slider>
			{/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
              You want delete this product
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                 <Button onClick={handleDelete}>Delete</Button>
                 <Button onClick={handleClose}>Cancel</Button>
          </Typography>
        </Box>
      </Modal> */}
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
		</>
	);
};

export default FlashCardUser;
