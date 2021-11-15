const express = require('express');
const mongoose = require('mongoose');
const {MONGO_URI} = require('./config');
const cors = require("cors")


const app = express();

const PORT = process.env.PORT || 5000;

const questionRoutes = require('./routes/api/question');
const quizRoutes = require('./routes/api/quiz');

app.use(cors())
app.options('*', cors())
app.use(express.json());

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use('/API/v1/questions', questionRoutes);
app.use('/API/v1/quizzes', quizRoutes);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));