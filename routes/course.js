// function coursesRoutes(){

//     app.post('/course/purchase',function (req,res){

//     res.json({
//         message:"Course has been purchased"
//     })

// })

// app.get('/course/preview', function (req,res){

// })
// }

// module.exports={
//     coursesRoutes:coursesRoutes
// }

const {Router} = require('express');
const {userMiddleware} = require("../middlewares/user");
const {PurchaseModal, CourseModal} =require("../db");
const courseRouter = Router();


    courseRouter.post('/purchase',userMiddleware ,async function (req,res){

  const {courseId, userId} = req.body;
//check if the user has purchased the course
    await PurchaseModal.create({
        courseId: courseId,
        userId: userId
    })
  res.json({
      message:"Course has been purchased"
  })

})

courseRouter.get('/preview', async function (req,res){

const courses = await CourseModal.find({});

        res.json({
        courses
    })

})


module.exports={
    courseRouter:courseRouter
}