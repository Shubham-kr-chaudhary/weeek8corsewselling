const jwt = require("jsonwebtoken");
const { JWT_SECRET_USER } = require('../config');


function userMiddleware(req,res,next){
const token = req.headers.token;
const decoded = jwt.verify(token, JWT_SECRET_USER);

if(decoded){
    req.userId = decoded.userId;
    next(); 
}else{
    res.status(401).json({
        message: "Invalid Token"
    });
}
}

module.exports={
    userMiddleware:userMiddleware
}