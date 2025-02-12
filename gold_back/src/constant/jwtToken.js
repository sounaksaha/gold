import jwt from 'jsonwebtoken';

const jwtToken =(_id,userName)=>{
   return jwt.sign({_id,userName},process.env.secret)
}

export default jwtToken;