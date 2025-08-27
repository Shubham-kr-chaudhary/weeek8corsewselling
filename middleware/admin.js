const jwt = require("jsonwebtoken");
const { JWT_SECRET_ADMIN } = require('../config');


function adminMiddleware(req,res,next){
const token = req.headers.token;
const decoded = jwt.verify(token, JWT_SECRET_ADMIN);

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
    adminMiddleware:adminMiddleware
}