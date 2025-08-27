
const{Router} = require('express');
const {UserModal, PurchaseModal}=require("../db");
const {z}=require("zod");
const jwtUser = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {userMiddleware} = require("../middlewares/user");
const userRouter = Router();

const { JWT_SECRET_USER } = require('../config');




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
const {email, password, firstName, lastName}=parsedBody.data;

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
        message: 'User Signup Successful'
    });

}

})

      
const signinSchema = z.object({
  email: z.email(),
  password: z.string().min(1)
});

userRouter.post('/signin', async function (req,res){

    
  const parsed = signinSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0].message });

  const { email, password } = parsed.data;

  try {
    const user = await UserModal.findOne({ email }).exec();
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwtUser.sign(
      { id: user._id.toString(), email: user.email },
      JWT_SECRET_USER
   
    );

    return res.json({ message: 'User Signin Successful', token });
  } catch (err) {
    console.error('Signin error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
    })

  


userRouter.get('/purchases',userMiddleware, async function (req,res){

    const userId = req.userId;

const purchases= await PurchaseModal.find({
    userId
})
const coursesdata = await CourseModal.find({
    _id: {$in: purchases.map((p)=>p.courseId)}
})
res.json({
        purchases,
        coursesdata
    })

})



module.exports = {
   userRouter: userRouter
}