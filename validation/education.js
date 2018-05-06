const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
	let errors = {};

	data.school = !isEmpty(data.school) ? data.school : "";
	data.degree = !isEmpty(data.degree) ? data.degree : "";
	data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : "";
	data.from = !isEmpty(data.from) ? data.from : "";

	if (Validator.isEmpty(data.school)) {
		errors.school = "School cannot be empty";
	}

	if (Validator.isEmpty(data.degree)) {
		errors.degree = "Degree cannot be empty";
	}

	if (Validator.isEmpty(data.fieldOfStudy)) {
		errors.fieldOfStudy = "Field of Study cannot be empty";
	}

	if (Validator.isEmpty(data.from)) {
		errors.from = "From cannot be empty";
	}

	return { errors, isValid: isEmpty(errors) };
};
