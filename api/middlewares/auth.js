const jwt = require('jsonwebtoken');

// Checks if there is a user in the token
module.exports.auth = function(req,res,next){
    const token = req.headers.authorization;
    try{
        const decoded = jwt.verify(token, 'team9');
        if (!decoded) throw("Decoding error");
        else{
            req.user = decoded.user;
            next();
        }
    }catch(err){
        console.log(err);
        res.status(401).json({err: err});
    }
};

// Checks if the user in the token is an admin
module.exports.authAdmin = function(req,res,next){
    const token = req.headers.authorization;
    console.log(token);
    try{
        const decoded = jwt.verify(token, 'team9');
        console.log(decoded);
        if (!decoded) throw("Decoding error");
        else{
            req.user = decoded.user;
            if (req.user.isAdmin){
                next();
            } else {
                throw("Unauthorized");
            }
        }
    }catch(err){
        console.log(err);
        res.status(401).json({err: err});
    }
};