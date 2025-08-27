const express = require('express');
const mongoose = require("mongoose");


const { courseRouter } = require('./routes/course');

const {userRouter} = require('./routes/user');
const { adminRouter } = require('./routes/admin');
const app = express();

app.use(express.json);

app.use("/api/v1/user",userRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/course", courseRouter)

// createUserroute(app);

// coursesRoutes(app);
async function main(){
    await mongoose.connect("mongodb+srv://skc070392:lpZCgSzh4n8AUnB2@cluster0.xnsakyk.mongodb.net/CourseSellingApp")
    app.listen(3000);
    console.log("App listening on port 3000")
}


 main()