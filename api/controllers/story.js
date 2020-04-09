const mongoose = require('mongoose');

const Session = require('../models/session');
const Story = require('../models/story');

exports.vote_story = (req, res, next) => {
    const { session_name, voter_name, story_name, story_point } = req.body;
    Session.findOneAndUpdate(
        { name: session_name }, 
        { "$set" : { "stories.$[story].voters.$[voter].point": story_point} },
        { "arrayFilters": [{"story.description" : story_name}, {"voter.name": voter_name}], new: true},
        (err, doc) => {
            if (err) {
                res.status(200).json({
                  status: false,
                  message: 'Something went wrong!'
                })
            }        
            res.status(200).json({
              status: true,
              message: 'Story updated successfully',
              session: doc
            })
        }
    )
}


exports.get_stories = (req, res, next) => {
    Story.find()
        .exec()
        .then(result => {
            res.status(200).json({
                status: true,
                result
            })
        })
        .catch(err => {
            res.status(200).json({
                status: false,
                error: err
            })
        })
}

exports.get_story = (req, res, next) => {
    const {story_name, session_name} = req.body;
    
    Session.findOne({name: session_name}).select({'stories': {$elemMatch: {description: story_name}}})
        .exec()
        .then(result => {
            res.status(200).json({
                status: true,
                result
            })
        })
        .catch(err => {
            res.status(200).json({
                status: false,
                error: err
            })
        })
}