const bcrypt = require('bcryptjs');
const saltRound = 10;

const hashGenerator = async (plainPassword)=>{
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(plainPassword,salt);
    return hash;

}


const hashValidator = async (plainPassword,hashPassword) => 
{
    const result = await bcrypt.compare(plainPassword,hashPassword);
    return result;
}

module.exports.hashGenerator = hashGenerator;
module.exports.hashValidator = hashValidator;
