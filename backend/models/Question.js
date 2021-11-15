const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
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
})

module.exports = mongoose.model('Question', QuestionSchema)

