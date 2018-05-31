import React, { Component } from "react";

class Login extends Component {
	constructor() {
		super();
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			email: "",
			password: ""
		};
	}
	handleInputChange(e) {
		this.setState({ [e.target.name]: [e.target.value] });
	}
	handleSubmit(e) {
		e.preventDefault();
		const user = {
			email: this.state.email,
			password: this.state.password
		};
		console.log(user);
	}
	render() {
		return (
			<div className="body__container">
				<div className="form__container">
					<h1 className="form__title">Sign In</h1>
					<p className="form__subtitle">Sign in to your Site Name account</p>
					<form onSubmit={this.handleSubmit}>
						<div className="form__group">
							<input
								type="email"
								className="form__input form__input--top"
								placeholder="Email Address"
								name="email"
								value={this.state.email}
								onChange={this.handleInputChange}
							/>
						</div>
						<div className="form__group">
							<input
								type="password"
								className="form__input  form__input--bottom"
								placeholder="Password"
								name="password"
								value={this.state.password}
								onChange={this.handleInputChange}
							/>
						</div>
						<input type="submit" className="form__submit" />
					</form>
				</div>
			</div>
		);
	}
}

export default Login;
