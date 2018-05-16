// this module is used to validate project input

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
	// initialize object for errors. Will be used to validate input.
	let errors = {};

	// if required fields are empty, turn them into strings.
	// Validator requires strings
	data.text = !isEmpty(data.text) ? data.text : "";

	if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
		errors.text = "Text must be between 10 and 300 characters.";
	}

	if (Validator.isEmpty(data.text)) {
		errors.text = "Text is required.";
	}

	return { errors, isValid: isEmpty(errors) };
};
