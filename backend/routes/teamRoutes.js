import express from 'express';
import {
	getTeams,
	createTeam,
	deleteTeam,
	editTeam,
	getTeamById,
	getUserTeamsId,
	createComment,
	updateComment,
	deleteComment,
} from '../controllers/teamControllers.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(getTeams).post(createTeam);

router
	.route('/:id')
	.get(getTeamById)
	.patch(protect, editTeam)
	.delete(protect, deleteTeam);

router.route('/user/:id').get(getUserTeamsId);

// comment routes
router.route('/:id/comment').post(protect, createComment);
router
	.route('/:id/comment/:comment_id')
	.patch(protect, updateComment)
	.delete(protect, deleteComment);

export default router;
