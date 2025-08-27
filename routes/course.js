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

const courseRouter = Router();


    courseRouter.post('/purchase',function (req,res){

    res.json({
        message:"Course has been purchased"
    })

})

courseRouter.get('/preview', function (req,res){

        res.json({
        message:"Courses"
    })

})


module.exports={
    courseRouter:courseRouter
}