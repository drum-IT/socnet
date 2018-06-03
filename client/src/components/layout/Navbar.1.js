import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
	render() {
		return (
			<nav className="nav">
				<div className="nav__container nav__container--left">
					<Link className="nav__link nav__link--main" to="/">
						Site Name
					</Link>
				</div>
				<div className="nav__container nav__container--right">
					<div className="nav__links">
						<div className="nav__links--main">
							{/* <Link className="nav__link" to="/profiles"> Creators</Link> */}
						</div>
						<div className="nav__links--auth">
							<Link className="nav__link" to="/login">
								Sign In
							</Link>
							<Link className="nav__link nav__link--callout" to="/register">
								Sign Up
							</Link>
						</div>
					</div>
				</div>
			</nav>
		);
	}
}

export default Navbar;
