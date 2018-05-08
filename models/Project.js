const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
	owner: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	name: {
		type: String,
		required: true,
		max: 40
	},
	members: [
		{
			type: Schema.Types.ObjectId,
			ref: "users"
		}
	],
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = Project = mongoose.model("project", ProjectSchema);
