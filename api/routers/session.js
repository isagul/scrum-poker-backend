const express = require('express');
const router = express.Router();

const SessionController = require('../controllers/session');

router.post('/create', SessionController.create_session);
router.post('/get-info', SessionController.get_session_info);
router.post('/vote', SessionController.vote_story);
router.get('/get-all', SessionController.get_all_session);

module.exports = router;