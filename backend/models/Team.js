import mongoose from 'mongoose';

const requirementSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
});
const commentSchema = mongoose.Schema({
	comment: {
		type: String,
		required: true,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
});

const teamSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		members: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			default: 'draft',
		},
		images: [
			{
				type: String,
				required: true,
			},
		],
		tags: [{ type: String }],
		link: { type: String, required: true },
		needs: [requirementSchema],
		comments: [commentSchema],
	},
	{
		timestamps: true,
	},
);

const Team = mongoose.model('teams', teamSchema);

export default Team;
