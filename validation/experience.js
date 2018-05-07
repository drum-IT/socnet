// this module is used to validate user experience

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
	// initialize object for errors. this will be used to validate input.
	let errors = {};

	// if required fields are emtpy, turn them into empty strings
	// Validator requires strings
	data.title = !isEmpty(data.title) ? data.title : "";
	data.company = !isEmpty(data.company) ? data.company : "";
	data.from = !isEmpty(data.from) ? data.from : "";

	if (Validator.isEmpty(data.title)) {
		errors.title = "A Title is required.";
	}

	if (Validator.isEmpty(data.company)) {
		errors.company = "A Company name is required.";
	}

	if (Validator.isEmpty(data.from)) {
		errors.from = "A starting date is required.";
	}

	return { errors, isValid: isEmpty(errors) };
};
