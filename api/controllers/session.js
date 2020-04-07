const mongoose = require('mongoose');

const Session = require('../models/session');

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
                const story = req.body.stories;
                let seperatedStories = story.split('↵');

                let newStory = seperatedStories.map(item => {
                    let newObj = {};
                    newObj["description"] = item;
                    newObj["point"] = "";
                    newObj["status"] = "Not Voted";
                    return newObj;
                });

                const session = new Session({
                    _id: mongoose.Types.ObjectId(),
                    name: req.body.name,
                    voters_number: req.body.voters_number,
                    stories: newStory,
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
                                session
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
    Session.findOne({name: req.body.name})
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