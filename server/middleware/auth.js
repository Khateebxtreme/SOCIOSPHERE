import jwt from "jsonwebtoken"

//authorization process 
export const verifyToken = async(req, res, next)=>{
  try{
    let token = req.header("Authorization");//grabbing the authorization header from our request which was sent from frontend

    if(!token){
      return res.status(403).send("Access Denied"); //for non existence of tokens
    }

    if(token.startsWith("Bearer ")){
      token = token.slice(7, token.length).trimLeft(); //getting the exact token
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  }
  catch(err){
    res.status(500).json({ error : err.message })
  }
}