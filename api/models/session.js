const mongoose = require('mongoose');
const {Schema} = mongoose;

const sessionSchema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    voters_number: {type: Number, required: true},
    stories: {type: Array, required: true},
});

module.exports = mongoose.model('Session', sessionSchema);