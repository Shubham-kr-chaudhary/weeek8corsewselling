// function createUserroute(){

// app.post('/user/login', function (req,res){

// })

// app.post('/user/signup', function (req,res){

// })
// app.get('/user/purchases', function (req,res){

// })

// }


// module.exports = {
//     createUserroute: createUserroute
// }



// const express = require('express')
// const Router = express.Router;


const{Router} = require('express');
const {UserModal}=require("../db");
const {z}=require("zod");
const bcrypt = require("bcrypt");
const userRouter = Router();

userRouter.post('/signin', async function (req,res){

  
})

userRouter.post('/signup', async function (req,res){


 const requiredBody = z.object({
            email: z.email().min(1),
            password: z.string().min(6),
            firstName: z.string(),
            lastName:z.string()
        });

        const parsedBody = requiredBody.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({
      message: parsedBody.error.issues[0].message,
    });
    return;
  }
const {email, password, firstName, lastName}=req.body;

let errorthrown = false;

try{

     const hashedPassword = await bcrypt.hash(password, 5);
    console.log(hashedPassword);

    await UserModal.create({
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName
        
    })

}catch(e){

 res.json({message:"error while inserting in db"});

        errorthrown = true;
    }
 if(!errorthrown){
    res.json({
        message: 'Admin Signup Successful'
    });

}

})
userRouter.get('/purchases', function (req,res){

            res.json({
        message:"Whatever you bought"
    })

})



module.exports = {
   userRouter: userRouter
}