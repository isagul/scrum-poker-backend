const express = require('express');
const router = express.Router();

const StoryController = require('../controllers/story');

router.post('/vote', StoryController.vote_story);
router.get('/get-stories', StoryController.get_stories);
router.post('/get-story', StoryController.get_story);
router.post('/update-final-score', StoryController.vote_story_final_score);

module.exports = router;