const express = require('express');
const router = express.Router();

const StoryController = require('../controllers/story');

router.post('/vote', StoryController.vote_story);
router.get('/get-stories', StoryController.get_stories);
router.post('/get-story', StoryController.get_story);

module.exports = router;