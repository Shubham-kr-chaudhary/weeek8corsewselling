const {Router} = require('express');
const{AdminModal} =require("../db");
const {z} = require("zod");

const bcrypt = require("bcrypt");
const jwtAdmin = require("jsonwebtoken");

const JWT_SECRET_ADMIN = "123456";



const adminRouter = Router();


adminRouter.post("/signup", async function (req,res){
   

      const requiredBody = z.object({
            email: z.string().min(1).email(),
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

    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    

     let errorthrown = false;
    try{
    const hashedPassword = await bcrypt.hash(password, 5);
    console.log(hashedPassword);

    await AdminModal.create({
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName:lastName
        
    })}catch(e){
        res.json({message:"error while inserting in db"});

        errorthrown = true;
    }
 if(!errorthrown){
    res.json({
        message: 'Admin Signup Successful'
    });
}
})





adminRouter.post("/signin", async function (req,res){

     const email = req.body.email;
    const password = req.body.password;

    const response = await AdminModal.findOne({
        email: email
       
    });

    if(!response){
        res.status(403).json({
            message: 'Invalid Credentials'
        }); 
        return;
    }

    const passwordMatch =  await bcrypt.compare(password, response.password);

    console.log(response);
    if(passwordMatch){
        const token = jwtAdmin.sign({
            id:response._id.toString()
        },JWT_SECRET_ADMIN);
        res.json({
            message: 'Admin Signin Successful',
            token: token
        });
    }else{
        res.status(403).json({
            message: 'Invalid Credentials'
        }); 
    }
})


adminRouter.post("/course", function (req,res){
    res.json({
        message:"admin post created"
    })
})


adminRouter.put("/course", function (req,res){
    res.json({
        message:"admin post updated"
    })
})

adminRouter.delete("/course", function (req,res){
    res.json({
        message:"admin post deleted"
    })
})


adminRouter.get("/course/bulk", function (req,res){
    res.json({
        message:"all admin posts"
    })
})


module.exports={
    adminRouter:adminRouter
}