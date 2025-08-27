const {Router} = require('express');
const{AdminModal, CourseModal} =require("../db");
const {z} = require("zod");

const bcrypt = require("bcrypt");
const jwtAdmin = require("jsonwebtoken");

const { JWT_SECRET_ADMIN } = require('../config');



const adminRouter = Router();


adminRouter.post("/signup", async function (req,res){
   

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

    const {email, password, firstName, lastName}=parsedBody.data;

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


const signupSchema = z.object({
  email: z.email(),
  password: z.string().min(1)
});




adminRouter.post("/signin", async function (req,res){

    //  const email = req.body.email;
    // const password = req.body.password;

    // const response = await AdminModal.findOne({
    //     email: email
       
    // });

    // if(!response){
    //     res.status(403).json({
    //         message: 'Invalid Credentials'
    //     }); 
    //     return;
    // }

    // const passwordMatch =  await bcrypt.compare(password, response.password);

    // console.log(response);
    // if(passwordMatch){
    //     const token = jwtAdmin.sign({
    //         id:response._id.toString()
    //     },JWT_SECRET_ADMIN);
    //     res.json({
    //         message: 'Admin Signin Successful',
    //         token: token
    //     });
    // }else{
    //     res.status(403).json({
    //         message: 'Invalid Credentials'
    //     }); 
    // }

    
        
      const parsed = signupSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0].message });
    
      const { email, password } = parsed.data;
    
      try {
        const user = await AdminModal.findOne({ email }).exec();
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(401).json({ message: 'Invalid credentials' });
    
        const token = jwtAdmin.sign(
          { id: user._id.toString(), email: user.email },
          JWT_SECRET_ADMIN
       
        );
    
        return res.json({ message: 'User Signin Successful', token });
      } catch (err) {
        console.error('Signin error:', err);
        return res.status(500).json({ message: 'Server error' });
      }
})


adminRouter.post("/course", adminMiddleware, async function (req,res){


    const adminId = req.userId;

    const {title, description, price, imageUrl} = req.body;

   const course = await CourseModal.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        creatorId: adminId
        
    })
    res.json({
        message:"course created",
        courseId: course._id.toString()
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