const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const random = require('mongoose-simple-random');

var QuestionSchema = new Schema({
    description: {
        type: String,
    },
    answers: [{
        text: {
            type: String,
            required: true
        },
        isCorrect: {
            type: Boolean,
            required: true,
            default: false
        }
    }]
});
// Needed for mongoose-simple-random to work
QuestionSchema.plugin(random); 

module.exports = mongoose.model('Question', QuestionSchema)

