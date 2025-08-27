const  mongoose = require("mongoose");

console.log("connected to db")
// mongoose.connect("mongodb+srv://skc070392:lpZCgSzh4n8AUnB2@cluster0.xnsakyk.mongodb.net/CourseSellingApp")
const Schema = mongoose.Schema;

// const{Schema} = require('mongoose');

const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
     email: {type:String, unique:true},
     password: String,
     firstName: String,
     lastName:  String

})

const courseSchema = new Schema({
    title: String,
    description: String,
    price:Number,
    imageUrl: String,
    creatorId:ObjectId
})


const adminSchema = new Schema({
     email: {type:String, unique:true},
     password: String,
     firstName: String,
     lastName:  String

})


const purchaseSchema = new Schema({
    courseId:ObjectId,
    userId:ObjectId
})




const UserModal = mongoose.model("users",userSchema);
const CourseModal = mongoose.model("courses",courseSchema);
const AdminModal = mongoose.model("admins",adminSchema);
const PurchaseModal = mongoose.model("purchases",purchaseSchema)




module.exports = {
    UserModal:UserModal,
    CourseModal:CourseModal,
    AdminModal:AdminModal,
    PurchaseModal:PurchaseModal
}
