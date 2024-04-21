import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	// Toogle Menu
	const [MobileMenu, setMobileMenu] = useState(false);
	const [adminDropdown, setAdminDropdown] = useState(false); // State to handle admin dropdown visibility

	const name = localStorage.getItem("FName");
	const logged = localStorage.getItem("login");

	const role = localStorage.getItem("role");

	const id = localStorage.getItem("_id");

	console.log("role - ", role);

	// Function to handle mouse enter event for admin dropdown
	const handleMouseEnter = () => {
		if (window.innerWidth > 960) {
			setAdminDropdown(true);
		}
	};

	// // Function to handle mouse leave event for admin dropdown
	// const handleMouseLeave = () => {
	// 	if (window.innerWidth > 960) {
	// 		setAdminDropdown(false);
	// 	}
	// };

	// Toggle dropdown function
	const toggleAdminDropdown = () => {
		setAdminDropdown(!adminDropdown);
	};

	return (
		<>
			<header className="header">
				<div className="container d_flex">
					<div className="d_flex">
						{/* <span
							class="fa-solid fa-border-all"
							style={{ fontSize: "18px" }}></span>
						<h6 className="mt-2">
							Categories
							<i className="fa fa-chevron-down"></i>
						</h6> */}
					</div>

					<div className="navlink">
						<ul
							className={
								MobileMenu
									? "nav-links-MobileMenu"
									: "link f_flex capitalize"
							}
							onClick={() => setMobileMenu(false)}>
							{/*<ul className='link f_flex uppercase {MobileMenu ? "nav-links-MobileMenu" : "nav-links"} onClick={() => setMobileMenu(false)}'>*/}
							{role === "user" ? (
								<li>
									<Link to="/">home</Link>
								</li>
							) : (
								<></>
							)}

							{role === "admin" ? (
								<li>
									<Link to="/admin">home</Link>
								</li>
							) : (
								<></>
							)}

							{role === "supplier" ? (
								<li>
									<Link to="/seller">home</Link>
								</li>
							) : (
								<></>
							)}

							{role === null ? (
								<li>
									<Link to="/">home</Link>
								</li>
							) : (
								<></>
							)}

							<li>
								<Link to="/about">About</Link>
							</li>
							<li>
								<Link to="/contact">Contact</Link>
							</li>

							{role === "admin" ? (
								<li
									className="admin-functions"
									onMouseEnter={() => setAdminDropdown(true)}
									onMouseLeave={() => setAdminDropdown(false)}
								>
									<button onClick={toggleAdminDropdown} style={{backgroundColor: 'transparent'}}>Menu</button>
									<div className={adminDropdown ? "admin-dropdown active" : "admin-dropdown"}>
										{/* Dropdown Links */}
										<Link to="/admin/users">User Profile Management</Link>
										{/* More links can be added here */}
									</div>
								</li>
							) : (
								<></>
							)}

							{/* <li>
								<Link to="/products">Products</Link>
							</li> */}
							{!logged ? (
								<li></li>
							) : (
								<li>
									<Link to={`/user/${id}`}>
										<p className="account">{name}</p>
									</Link>
								</li>
							)}
						</ul>

						<button
							className="toggle"
							onClick={() => setMobileMenu(!MobileMenu)}>
							{MobileMenu ? (
								<i className="fas fa-times close home-btn"></i>
							) : (
								<i className="fas fa-bars open"></i>
							)}
						</button>
					</div>
				</div>
			</header>
			<style jsx>
				{`
				.admin-functions {
					position: relative;
				  }
		  
				  .admin-dropdown {
					display: none;
					position: absolute;
					background-color: #f9f9f9;
					min-width: 250px;
					box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
					z-index: 1;
					opacity: 0;
					transition: opacity 0.5s ease, visibility 0.5s;
					visibility: hidden;
				  }
		  
				  .admin-dropdown.active {
					display: block;
				  }
		  
				  .admin-dropdown a {
					color: black;
					padding: 0px 16px;
					text-decoration: none;
					display: block;
					text-align: left;
					font-size: 14px;
				  }
		  
				  .admin-functions:hover .admin-dropdown {
					display: block;
					opacity: 1;
    				visibility: visible;
				  }
		  
				  .admin-dropdown a:hover {
					background-color: #ddd;
				  }
      		`}
			</style>
		</>
	);
};

export default Navbar;
