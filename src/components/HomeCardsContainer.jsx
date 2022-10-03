import React, { useEffect } from "react";
import { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/HomeCardsContainer.css";

import cuate from "../assets/pictures/cuate.png";
import pana from "../assets/pictures/pana.png";
import bgBottom from "../assets/pictures/bg-bottom.png";

const HomeCardsContainer = () => {
	useEffect(() => {
		AOS.init();
		AOS.refresh();
	}, []);
	const [theme , setTheme] = useState("light-theme");
	const toggleTheam = () => {
	  if (theme === "dark-theme"){
		setTheme("light-theme");
	  }else{
		setTheme("dark-theme");
	  }
	};
  
	useEffect(() => {
	  document.body.className = theme;
	}, [theme]);

	return (
		<div className="bodysection">
			<div id="body-section">
				<img
					className="img_0"
					src={pana}
					alt=""
					data-aos="fade-right"
					data-aos-duration="500"
				/>

				<div
					className="contents content_0"
					data-aos="fade-left"
					data-aos-duration="500"
				>
					<div className="container">
						<h1 className="content_head">WHAT DO WE DO ? </h1>

						<hr className="new1" />

						<h2 className="content_head2">
							We conjugate help and need{" "}
						</h2>

						<p className="content_p">
							It is a platform where we try and bring together all the
							various NGOs and Clubs and potential donors across the
							world and connect them to the right communities so that
							people like you and I can send and receive help to and
							from our desired communities.
						</p>
					</div>
				</div>

				<div
					className="contents content_1"
					data-aos="fade-right"
					data-aos-duration="500"
				>
					<div className="container">
						<h1 className="content_head">WE CONNECT PEOPLE</h1>

						<hr className="new1" />

						<h2 className="content_head2">
							Milan unites more than a million people
						</h2>

						<p className="content_p">
							Together, we see a world where people unite and take
							action to create lasting change – across the globe, in
							our communities, and in ourselves.
						</p>
					</div>
				</div>

				<img
					className="img_1"
					src={cuate}
					alt=""
					data-aos="fade-left"
					data-aos-duration="500"
				/>

				
			</div>
		</div>
	);
};

export default HomeCardsContainer;
