import React from "react";
import "../styles/DonateBanner.css";
import donateImg from "../assets/pictures/donate-banner.png";
import { Link } from "react-router-dom";

const DonateBanner = () => {
	return (
		<div id="donate-banner"
			className="d-flex justify-content-evenly"
		>
			<div
				id="donateCol1"
				className="d-flex flex-column justify-content-center align-items-start me-5"
			>
				<h2 className="mb-4">You can help us too !!</h2>
				<p>Happiness increases when you share your love.</p>{" "}
				<p>So why not help millions by sharing your love ?</p>
				<Link to={"/donateus"}>

					<button className="mt-4 button_animation">Share your love ❤️</button>

				</Link>
			</div>
			<div id="donateCol2">
				<img src={donateImg} alt="" className="donateImg" />
			</div>
		</div>
	);
};

export default DonateBanner;
