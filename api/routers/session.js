const express = require('express');
const router = express.Router();

const SessionController = require('../controllers/session');

router.post('/create', SessionController.create_session);
router.post('/get-info', SessionController.get_session_info);

module.exports = router;