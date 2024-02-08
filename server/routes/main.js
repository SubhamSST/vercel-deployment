const express= require('express');
const router = express.Router();
const User=require('../models/user');
const jwt=require('jsonwebtoken');



const maxAge=3*24*60*60;
const createToken=(id)=>{
    return jwt.sign({id},'sstonlytruekingforever',{expiresIn:maxAge});
}

const requireAuth=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(token){
        jwt.verify(token,'sstonlytruekingforever',(err,decodedToken)=>{
            if(err){
                console.log(err,message);
                res.render('login.ejs');
            }else{
                next();
                console.log(decodedToken);
            }
            
        })
    }
    else{res.render('login.ejs');}
}


router.get('/',(req,res)=>{
    res.render('index.ejs');
})

router.get('/getStarted',requireAuth,(req,res)=>{
    res.render('dashboard.ejs');
})
router.get('/register',(req,res)=>{
    res.render('register.ejs');
})
router.post('/register',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.create({email,password});
        const token=createToken(user._id);
        res.cookie('jwt',token,{maxAge:1000*maxAge});
        // res.status(201).json(user);
        res.render('dashboard.ejs');
        
    }
    catch(err){
        res.send(err);
    }
});
router.post('/login',async(req,res)=>{
const {email,password}=req.body;
console.log(req.body.email);
try{
    const user=await User.login(email,password);
    const token = createToken(user._id);
    res.cookie('jwt',token,{maxAge:1000*maxAge});
    res.render('dashboard.ejs');

}
catch(err){
    console.log(err.message);}
});
router.get('/LogOut',(req,res)=>{
    res.cookie('jwt','',{maxAge:1});
res.render('index')
});


module.exports = router;