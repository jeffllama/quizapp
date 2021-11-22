const express = require('express');
const mongoose = require('mongoose');
const {MONGO_URI} = require('./config');
const cors = require("cors")


const app = express();

const PORT = process.env.PORT || 5000;

const questionRoutes = require('./routes/api/question');
const quizRoutes = require('./routes/api/quiz');
const userRoutes = require('./routes/api/user')

app.use(cors())

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", '*');
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//     next();
// })

app.use(express.json());

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use('/API/v1/questions', questionRoutes);
app.use('/API/v1/quizzes', quizRoutes);
app.use('/API/v1/users',userRoutes)

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));