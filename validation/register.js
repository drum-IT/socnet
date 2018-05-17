// This module is used to validate user registration

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
	// initialize object for errors. Will be used to validate input.
	let errors = {};

	// if required fields are blank, turn them into empty strings so that validator will work.
	// Validator requires strings.
	data.name = !isEmpty(data.name) ? data.name : "";
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";
	data.password2 = !isEmpty(data.password2) ? data.password2 : "";

	if (!Validator.isLength(data.name, { min: 2, max: 100 })) {
		errors.name = "Name must be between 2, and 100 characters.";
	}

	if (Validator.isEmpty(data.name)) {
		errors.name = "A Name is required.";
	}

	if (!Validator.isEmail(data.email)) {
		errors.email = "Email format is invalid.";
	}

	if (Validator.isEmpty(data.email)) {
		errors.email = "An Email address is required.";
	}

	if (!Validator.isLength(data.password, { min: 6, max: 40 })) {
		errors.password = "Password must be between 6, and 40 characters.";
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = "A Password is required.";
	}

	if (Validator.isEmpty(data.password2)) {
		errors.password2 = "Password must be confirmed.";
	}

	if (!Validator.equals(data.password, data.password2)) {
		errors.password2 = "Passwords do not match";
	}

	return { errors, isValid: isEmpty(errors) };
};
