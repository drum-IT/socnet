// this module is used to validate user login

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
	console.log(data);
	// initialize object for errors. Will be used to validate input.
	let errors = {};

	// if required fields are empty, turn them into strings.
	// Validator requires strings
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";

	if (!Validator.isEmail(data.email)) {
		errors.email = "Email format is invalid.";
	}

	if (Validator.isEmpty(data.email)) {
		errors.email = "An Email address is required.";
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = "A Password is required.";
	}

	return { errors, isValid: isEmpty(errors) };
};
