import asyncHandler from 'express-async-handler';
import Team from '../models/Team.js';

// @desc    Fetch all Teams
// @route   GET /api/Teams?status=status
// @access  Public
const getTeams = asyncHandler(async (req, res) => {
	const status = req.query.status
		? {
				status: {
					$regex: req.query.status,
					$options: 'i',
				},
		  }
		: {};
	const teams = await Team.find({ ...status })
		.sort({ createdAt: -1 })
		.populate({
			path: 'user',
			select:
				'-password -isAdmin -savedPosts -blocked -reports -updatedAt -createdAt -_id -__v',
		});
	res.status(200).json(teams);
});
// @desc    create a team
// @route   team /api/teams
// @access  Private

const createTeam = asyncHandler(async (req, res) => {
	const { title, description, tags, images, link, needs, userId } = req.body;
	// const user = req.user._id;

	const team = new Team();

	team.title = title;
	team.description = description;
	team.tags = tags;
	team.needs = needs || [];
	team.link = link;
	team.images = images;
	team.user = userId;
	const createdTeam = await team.save();
	res.status(201).json({ id: createdTeam._id });
});

// @desc    Get a team by its Id
// @route   Get /api/teams/:id
// @access  Public
const getTeamById = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const team = await Team.findById(id)
		.populate({
			path: 'user',
			select: '-password -savedPosts -updatedAt -createdAt -_v',
		})
		.populate({
			path: 'comments.author',
			select:
				'-updatedAt -password -savedPosts -isAdmin -reports -blocked -email -verified -__v',
		});

	if (team) {
		res.status(200).json(team);
	} else {
		res.status(404).json({ message: 'Team not found' });
	}
});

// @desc    Get teams by its user Id
// @route   Get /api/teams/user/:id
// @access  Public
const getUserTeamsId = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const teams = await Team.find({ user: id }).sort({ createdAt: -1 });
	if (teams) {
		res.status(200).json(teams);
	} else {
		res.status(404).json({ message: 'No teams found' });
	}
});

// @desc    Edit a team by its Id
// @route   team /api/teams/:id
// @access  Private
const editTeam = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { title, description, tags, needs, images, link, members, status } =
		req.body;

	const team = await Team.findById(id);
	if (team) {
		if (team.user.toString() == req.user._id || req.user.isAdmin === true) {
			team.title = title || team.title;
			team.description = description || team.description;
			team.tags = tags || team.tags;
			team.needs = needs || team.needs;
			team.link = link || team.link;
			team.images = images || team.images;
			team.status = status || team.status;
			team.members = members || team.members;

			const updatedTeam = await team.save();
			res.status(201).json(updatedTeam);
		} else {
			res
				.status(401)
				.json({ message: 'you are not authorized to edit this team' });
		}
	} else {
		res.status(404).json({ message: 'Team not found...' });
	}
});
// @desc    Delete a team by its Id
// @route   DELETE /api/teams/:id
// @access  Private
const deleteTeam = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const team = await Team.findById(id);

	if (team) {
		if (team.user.toString() == req.user._id || req.user.isAdmin === true) {
			await team.remove();
			res.status(201).json({ message: 'Team removed' });
		} else {
			res
				.status(401)
				.json({ message: 'you are not authorized to delete this team' });
		}
	} else {
		res.status(404).json({ message: 'Team not found...' });
	}
});

// @desc    create comment
// @route   POST /api/posts/:id/comment
// @access  Private
const createComment = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { comment } = req.body;
	const team = await Team.findById(id);
	console.log('team: ', team);
	if (team) {
		// const isAlreadyCommented = team.comments.find(
		// 	(comment) => comment.author == String(req.user._id),
		// );
		// if (!isAlreadyCommented) {
		// 	res.status(401).json({ message: 'You can comment a team only once' });
		// } else {
		// }
		team.comments.unshift({ comment, author: req.user._id });
		const commentedTeam = await team.save();
		res.status(201).json({ message: 'Comment created successfully.' });
	} else {
		res.status(404).json({ message: 'Team not found...' });
	}
});
// @desc    update comment
// @route   POST /api/teams/:id/comment/:comment_id
// @access  Private
const updateComment = asyncHandler(async (req, res) => {
	const { id, comment_id } = req.params;
	const { comment } = req.body;
	const team = await Team.findById(id);
	if (team) {
		// if (post.user.toString() !== req.user._id || req.user.isAdmin === false) {
		// 	return res
		// 		.status(401)
		// 		.json({ message: 'You are not authorized to update this comment.' });
		// }
		const oldComment = team.comments.find(
			(comment) => (comment._id = comment_id),
		);
		if (oldComment) {
			oldComment.comment = comment;
			const projectComments = team.comments
				.filter((comment) => comment._id == comment_id)
				.unshift({ comment, author: req.user._id });
			team.comments = projectComments;
			await team.save();
			res.status(201).json({
				message: 'Comment is updated successfully.',
			});
		} else {
			res.status(404).json({ message: 'comment not found...' });
		}
	} else {
		res.status(404).json({ message: 'Team not found...' });
	}
});
// @desc    delete comment
// @route   POST /api/teams/:id/comment/:comment_id
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
	const { id, comment_id } = req.params;

	const team = await Team.findById(id);
	if (!team) return res.status(404).json({ message: 'team not found...' });

	const commentToDelete = team?.comments?.find(
		(comment) => comment?._id == comment_id,
	);

	if (!commentToDelete)
		return res.status(404).json({ message: 'Comment not found...' });

	if (String(commentToDelete?.author) != String(req?.user?._id)) {
		return res
			.status(401)
			.json({ message: 'You are not authorized to delete this comment.' });
	}

	team.comments = team?.comments?.filter(
		(comment) => comment?._id?.toString() !== comment_id,
	);

	await team.save();

	res.status(201).json({ message: 'Comment was deleted successfully.' });
});

export {
	getTeams,
	createTeam,
	getUserTeamsId,
	getTeamById,
	editTeam,
	deleteTeam,
	createComment,
	deleteComment,
	updateComment,
};
