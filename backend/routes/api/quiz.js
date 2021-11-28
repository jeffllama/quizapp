const express = require('express');
const router = express.Router();

const Quiz = require('../../models/Quiz');
const Question = require('../../models/Question');


const quizTotals = {
    "GET API/V1/quiz/:id": 0,
    "GET API/V1/quiz/:id/Questions": 0,
    "GET API/V1/quiz/generaterandom/:name/:amount" : 0,
    "PUT API/V1/quiz/:id" : 0,
    "DELETE API/V1/quiz/:id" : 0
}

router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        if (!quizzes) {
            return res.status(404).json({"error": "No quizzes found"})
        } else {
            return res.status(200).json(quizzes);
        }
    } catch (err){
        return res.status(500).json({"error": err})
    }
});

router.get('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz){
            return res.status(404).json({"error": "No quiz found"})
        } else {
            quizTotals["GET API/V1/quiz/:id"] += 1
            return res.status(200).json(quiz);
        }
    } catch (err){
        return res.status(500).json({"error": err})
    }
});

router.get('/:id/questions', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id).populate("questions");
        if (!quiz){
            return res.status(404).json({"error": "No quiz found"})
        } else {
            quizTotals["GET API/V1/quiz/:id/Questions"] +=1;
            return res.status(200).json(quiz);
        }
    } catch (err){
        return res.status(500).json({"error": err})
    }
});
// Generates a random quiz based on a name and amount of questions
router.get('/generaterandom/:name/:amount', async (req, res)=>{
    const {name, amount} = req.params;

    await Question.findRandom({}, {}, {limit: amount}, async function(err, results){
        if (err) throw Error(err);
        else {
            let questions = []
            results.forEach(result => {
                questions.push(result._id);
            })
            try {
                let quiz = await Quiz.create({
                    name,
                    questions
                });
                quizTotals["GET API/V1/quiz/generaterandom/:name/:amount"] +=1;
                return res.status(201).json(quiz);
            } catch(err) {
                return res.status(500).json({"error": err})
            }
        }
    });
});

router.put('/:id', async (req, res) => {
    try {
        const {name, questions} = req.body;
        let quiz = await Quiz.findById(req.params.id);
        if (!quiz){
            // Creating quiz if not found 
            quiz = await Quiz.create({
                name,
                questions
            });
            return res.status(201).json(quiz); 
        } else {
            quiz.name = name;
            quiz.questions = questions
            await quiz.save();
            quizTotals["PUT API/V1/quiz/:id"] +=1;
            return res.status(200).json(quiz);
        }
    } catch (err){
        return res.status(500).json({"error": err})
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!quiz){
            return res.status(404).json({"error": "No question found"})
        } else {
            quizTotals["DELETE API/V1/quiz/:id"] +=1;
            return res.status(200).json(quiz);
        }
    } catch (err){
        return res.status(500).json({"error": err})
    }
});

// Payload example:
// {
//     "name": "NEW test quiz",
//     "questions": [
//         {"_id": "6191b29c93c1245d4e84b162"},
//         {"_id": "6191b84d2839b6361d767428"}
        
//     ] 
// } 
router.post('/', async (req, res)=>{
    const newQuiz = new Quiz(req.body);

    try {
        const post = await newQuiz.save();
        if(!post) throw Error("Something went wrong saving new question");

        res.status(201).json(post);
    } catch(err) {
        res.status(500).json({"error": err})
    }
});



module.exports = router;
module.exports.quizTotals = quizTotals