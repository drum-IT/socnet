// this function returns true if a value is empty.
// a value is considered empty if it is undefined, null, an empty object, or a string with length 0

const isEmpty = value =>
	value === undefined ||
	value === null ||
	(typeof value === "object" && Object.keys(value).length === 0) ||
	(typeof value === "string" && value.trim().length === 0);

module.exports = isEmpty;
