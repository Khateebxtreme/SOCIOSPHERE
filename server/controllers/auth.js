/* Required imports */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Register User */

//async function because it interacts with the mongo database
export const register = async (req,res) => {
  try{
    //catching data items from request's body
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation
    } = req.body;

    const salt = await bcrypt.genSalt();//encryption salt for our password
    const passwordHash = await bcrypt.hash(password , salt); //encrypting the user provided password

    //we first encrypt the password and then save it and if a user tries to login , they will provide a pass and we will salt it again and match with the saved password. If there is a match , we can authorize the user.
    const newUser = new User({
      firstName,
      lastName,
      email,
      password : passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile : Math.floor(Math.random() * 10000) ,
      impressions : Math.floor(Math.random() * 10000)
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser); //sending user back as a response if no error occurs
  }
  catch(err){
    res.status(500).json({ error : err.message });
  }
}

/* Log In functionality */

export const login = async (req,res)=>{
  try{
    const { email, password }  = req.body;
    const user = await User.findOne({ email : email }) //finding the user with specefied email
    if(!user)res.status(400).json({ msg: "User does not exist" }) //checks for existence of user in the mongo database

    const isMatch = await bcrypt.compare(password,user.password); //comparing password that was saved and the user provided password as both use the same salt making it easier for comparing.
    if(!isMatch)res.status(400).json({ msg: "Invalid Credentials provided" })

    const token = jwt.sign({ id : user._id}, process.env.JWT_SECRET);
    delete user.password;//deleting so it doesn't get sent to frontend as a response
    res.status(200).json({token,user}); //this token can be used as verification for authentication process
  }
  catch(err){
    res.status(500).json({ error : err.message });
  }
}
