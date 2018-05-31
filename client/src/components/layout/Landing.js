import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
	render() {
		return (
			<div className="landing">
				<div className="landing__container">
					{/* <h1 className="landing__title">Site Name</h1> */}
					<div className="landing__container--inner">
						{/* <Link to="/register" className="button">
							Get Started
						</Link>
						<Link to="/login" className="button">
							Login
						</Link> */}
					</div>
				</div>
			</div>
		);
	}
}

export default Landing;
