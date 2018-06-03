import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";

class Register extends Component {
	constructor() {
		super();
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.state = {
			name: "",
			email: "",
			password: "",
			password2: "",
			errors: {}
		};
	}
	handleInputChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	handleFormSubmit(e) {
		e.preventDefault();
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};
		axios
			.post("/api/users/register", newUser)
			.then(response => console.log(response.data))
			.catch(err => this.setState({ errors: err.response.data }));
	}
	render() {
		const { errors } = this.state;
		return (
			<div className="body__container">
				<div className="form__container">
					<h1 className="form__title">Sign Up</h1>
					<p className="form__subtitle">Create your Site Name account</p>
					<form onSubmit={this.handleFormSubmit} noValidate>
						<div className="form-group">
							<input
								type="text"
								className={classnames("form__input form__input--top", {
									"is-invalid": errors.name
								})}
								placeholder="Name"
								name="name"
								value={this.state.name}
								onChange={this.handleInputChange}
							/>
							{errors.name && (
								<div className="invalid-feedback">{errors.name}</div>
							)}
						</div>
						<div className="form__group">
							<input
								type="email"
								className={classnames("form__input", {
									"is-invalid": errors.email
								})}
								placeholder="Email Address"
								name="email"
								value={this.state.email}
								onChange={this.handleInputChange}
							/>
							{errors.email && (
								<div className="invalid-feedback">{errors.email}</div>
							)}
							{/* <small className="form-text text-muted">
										This site uses Gravatar so if you want a profile image, use
										a Gravatar email
									</small> */}
						</div>
						<div className="form__group">
							<input
								type="password"
								className={classnames("form__input", {
									"is-invalid": errors.password
								})}
								placeholder="Password"
								name="password"
								value={this.state.password}
								onChange={this.handleInputChange}
							/>
							{errors.password && (
								<div className="invalid-feedback">{errors.password}</div>
							)}
						</div>
						<div className="form__group">
							<input
								type="password"
								className={classnames("form__input form__input--bottom", {
									"is-invalid": errors.password2
								})}
								placeholder="Confirm Password"
								name="password2"
								value={this.state.password2}
								onChange={this.handleInputChange}
							/>
							{errors.password2 && (
								<div className="invalid-feedback">{errors.password2}</div>
							)}
						</div>
						<input type="submit" className="form__submit" />
					</form>
				</div>
			</div>
		);
	}
}

export default Register;
