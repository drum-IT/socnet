module.exports = {
	mongoURI: process.env.MONGODB_URI || "mongodb://localhost/socnet",
	secretOrKey:
		process.env.SECRET ||
		"that time when you spun around so fast you lost your lunch"
};
