const mongoose = require('mongoose');

const Session = require('../models/session');
const Story = require('../models/story');

exports.create_session = (req, res, next) => {
    Session.findOne({ name: req.body.name })
        .exec()
        .then(result => {
            if (result) {
                return res.status(200).json({
                    status: false,
                    message: 'This session name already exist'
                })
            } else {
                const { stories, voters_number } = req.body;
                let seperatedStories = stories.split('\n');                

                let votersArray = [
                    { name: 'Scrum Master', point: '', status: 'Not Voted' }
                ];

                for (let i = 1; i < Number(voters_number); i++) {
                    let newVoter = {};
                    newVoter['name'] = `Voter ${i}`;
                    newVoter['point'] = '';
                    newVoter['status'] = 'Not Voted';
                    votersArray.push(newVoter);
                }

                let sessionStory = seperatedStories.map(item => {
                    let newObj = {};
                    /*const story = new Story({
                        _id: mongoose.Types.ObjectId(),
                        description: item,
                        point: '',
                        status: 'Not Voted',
                        voters: votersArray
                    })*/
                    newObj["_id"] = mongoose.Types.ObjectId();
                    newObj["description"] = item;
                    newObj["point"] = "";
                    newObj["status"] = "Not Voted";
                    newObj["voters"] = votersArray;
                    return newObj;
                });

                const session = new Session({
                    _id: mongoose.Types.ObjectId(),
                    name: req.body.name,
                    voters_number: req.body.voters_number,
                    stories: sessionStory
                });

                session
                    .save()
                    .then(result => {
                        res.status(200).json({
                            status: true,
                            createdSession: {
                                id: result._id,
                                name: result.name,
                                voters_number: result.voters_number,
                                stories: result.stories
                            }
                        })
                    })
                    .catch(err => {
                        res.status(200).json({
                            status: false,
                            error: err
                        })
                    })
            }
        })
}

exports.get_session_info = (req, res, next) => {
    Session.findOne({ name: req.body.name })
        .exec()
        .then(result => {
            if (!result) {
                return res.status(200).json({
                    status: false,
                    message: 'There is no session called this name'
                })
            } else {
                res.status(200).json({
                    status: true,
                    session: {
                        _id: result._id,
                        name: result.name,
                        voters_number: result.voters_number,
                        stories: result.stories
                    }
                })
            }
        })
        .catch(err => {
            res.status(200).json({
                status: false,
                error: err
            })
        })
}

exports.vote_story = (req, res, next) => {
    const { session_name, voter_name, story_name, story_point } = req.body;
    Session.findOneAndUpdate(
        { name: session_name }, 
        { "$set" : { "stories.$[story].voters.$[voter].point": story_point, 'stories.$[story].voters.$[voter].status': 'Voted'} },
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

// { "arrayFilters": [{"story.description" : story_name}, {"voter.name": voter_name}], new: true},

exports.get_all_session = (req, res, next) => {
    Session.find()
        .exec()
        .then(result => {
            res.status(200).json({
                status: true,
                count: result.length,
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