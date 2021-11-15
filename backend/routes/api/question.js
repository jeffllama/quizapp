const express = require('express');
const router = express.Router();

const Question = require('../../models/Question');



// GET all API/v1/questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        if (!questions) {
            return res.status(404).json({"error": "No questions found"})
        } else {
            return res.status(200).json(questions);
        }
    } catch (err){
        return res.status(500).json({"error": err})
    }
});
// GET API/v1/questions/:id
router.get('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question){
            return res.status(404).json({"error": "No question found"})
        } else {
            return res.status(200).json(question);
        }
    } catch (err){
        return res.status(500).json({"error": err})
    }
});
// PUT API/v1/questions/:id
router.put('/:id', async (req, res) => {
    try {
        const {description, answers} = req.body;
        let question = await Question.findById(req.params.id);
        if (!question){
            // Creating question if not found 
            question = await Question.create({
                description,
                answers
            });
            return res.status(201).json(question); 
        } else {
            question.description = description;
            question.answers = answers
            await question.save();
            return res.status(200).json(question);
        }
    } catch (err){
        return res.status(500).json({"error": err})
    }
});
// Delete API/v1/questions/:id
router.delete('/:id', async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question){
            return res.status(404).json({"error": "No question found"})
        } else {
            return res.status(200).json(question);
        }
    } catch (err){
        return res.status(500).json({"error": err})
    }
});

// Payload example:
// {
//     "description": "What is 2x2?",
//     "answers": [
//         {"text": 420},
//         {"text": 8},
//         {"text": 20},
//         {"text": 4, "isCorrect": true}
//     ] 
//  }
router.post('/', async (req, res)=>{
    const newQuestion = new Question(req.body);

    try {
        const post = await newQuestion.save();
        if(!post) throw Error("Something went wrong saving new question");

        res.status(201).json(post);
    } catch(err) {
        res.status(400).json({"error": err})
    }
});

module.exports = router;