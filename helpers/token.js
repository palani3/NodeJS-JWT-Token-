const jwt =require('jsonwebtoken');

const tokenGenerator = (email)=>{
    const token = jwt.sign({email},
        process.env.JWT_KEY,
        {expiresIn:"3minutes"}
        )
        return token;
}

const tokenValidator =(token)=>{
    const data = jwt.verify(token,process.env.JWT_KEY);
    return data;
}


module.exports.tokenGenerator=tokenGenerator;
module.exports.tokenValidator=tokenValidator;