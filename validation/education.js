const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
	// initialize object for errors. this will be used to validate input.
	let errors = {};

	// if required fields are emtpy, turn them into empty strings
	// Validator requires strings
	data.school = !isEmpty(data.school) ? data.school : "";
	data.degree = !isEmpty(data.degree) ? data.degree : "";
	data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : "";
	data.from = !isEmpty(data.from) ? data.from : "";

	if (Validator.isEmpty(data.school)) {
		errors.school = "A School name is required.";
	}

	if (Validator.isEmpty(data.degree)) {
		errors.degree = "A Degree is required.";
	}

	if (Validator.isEmpty(data.fieldOfStudy)) {
		errors.fieldOfStudy = "A Field of Study is required.";
	}

	if (Validator.isEmpty(data.from)) {
		errors.from = "A start date is required.";
	}

	return { errors, isValid: isEmpty(errors) };
};
