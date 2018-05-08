// this module is used to validate project input

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProjectInput(data) {
	// initialize object for errors. Will be used to validate input.
	let errors = {};

	// if required fields are empty, turn them into strings.
	// Validator requires strings
	data.name = !isEmpty(data.name) ? data.name : "";

	if (Validator.isEmpty(data.name)) {
		errors.name = "A Name is required.";
	}

	return { errors, isValid: isEmpty(errors) };
};
