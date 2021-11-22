const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

const User = require('../../models/User')

const userTotals = {
    "POST /signup": 0,
    "POST /login": 0,
    "POST /admin-login" : 0
}

// router.get('/', async(req,res,next) => {
//     res.status(200).json({yes: "YESSIR"})
// })

router.post("/signup", async (req,res,next) => {
    const body = req.body

    const salt = await bcrypt.genSalt(10)

    if (!(body.user && body.password)) {
        return res.status(400).json({message : "Invalid Username or Password"})
    }

    const newUser = {
        user : body.user,
        pwdHash : await bcrypt.hash(body.password, salt)
    };

    await User.create(newUser)

    userTotals["POST /signup"] += 1

    res.status(200).json({message : "New User Created!"})


})

router.post("/login", async(req,res,next) => {
    const body = req.body

    const user = await User.findOne({ user: body.user})

    if(user){
        // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        userTotals["POST /login"] += 1;
        res.status(200).json({ message: "Valid password" });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    }
    else{
        res.status(401).json({ error: "User does not exist" });
    }
});

router.post("/admin-login", async(req,res,next) => {

    const body = req.body;


    const user = await User.findOne({user : "admin"});

    const validPassword = await bcrypt.compare(body.password, user.pwdHash);

    if (body.user == 'admin' && validPassword) {
        userTotals["POST /admin-login"] += 1
        res.status(200).json({message: "GOOD"})
    }
    else {
        res.status(400).json({message: "Invalid login"})
    }
    
})

router.get("/user-api-totals", async(req,res,next) =>{
    res.status(200).json(userTotals)
})



module.exports = router;
