const express = require('express');
const router = express.Router();

const SessionController = require('../controllers/session');

router.post('/create', SessionController.create_session);
router.post('/get-info', SessionController.get_session_info);
router.get('/get-all', SessionController.get_all_session);
router.post('/update-next-story-status', SessionController.update_next_story_status);

module.exports = router;