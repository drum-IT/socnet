// this module is used to validate use profile input

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
	// initialize object for errors. this will be used to validate input.
	let errors = {};

	// if required fields are emtpy, turn them into empty strings
	// Validator requires strings
	data.handle = !isEmpty(data.handle) ? data.handle : "";
	data.status = !isEmpty(data.status) ? data.status : "";
	data.skills = !isEmpty(data.skills) ? data.skills : "";

	if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
		errors.handle = "Handle must be between 2 and 40 characters.";
	}

	if (Validator.isEmpty(data.handle)) {
		errors.handle = "A Handle is required.";
	}

	if (Validator.isEmpty(data.status)) {
		errors.status = "A Status is required.";
	}

	if (Validator.isEmpty(data.skills)) {
		errors.skills = "At least one Skill is required.";
	}

	if (!isEmpty(data.website)) {
		if (!Validator.isURL(data.website)) {
			errors.website = "This is not a valid URL.";
		}
	}

	if (!isEmpty(data.youtube)) {
		if (!Validator.isURL(data.youtube)) {
			errors.youtube = "This is not a valid URL.";
		}
	}

	if (!isEmpty(data.twitter)) {
		if (!Validator.isURL(data.twitter)) {
			errors.twitter = "This is not a valid URL.";
		}
	}

	if (!isEmpty(data.facebook)) {
		if (!Validator.isURL(data.facebook)) {
			errors.facebook = "This is not a valid URL.";
		}
	}

	if (!isEmpty(data.instagram)) {
		if (!Validator.isURL(data.instagram)) {
			errors.instagram = "This is not a valid URL.";
		}
	}

	if (!isEmpty(data.linkedin)) {
		if (!Validator.isURL(data.linkedin)) {
			errors.linkedin = "This is not a valid URL.";
		}
	}

	return { errors, isValid: isEmpty(errors) };
};
