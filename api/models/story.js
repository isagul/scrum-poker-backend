const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const storySchema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    description: {type: String, required: true},
    point: {type: Number, required: true},
    status: {type: String, required: true},
    voters: {type: Array, required: true},
});

module.exports = model('Story', storySchema);