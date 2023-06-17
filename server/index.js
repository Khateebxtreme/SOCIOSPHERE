/*
dependencies used ->
1) nodemon -> running our server as a live service and it refreshes the server on every save or change.
2) express 
3) body-parser -> to process the request body 
4) brypt -> for password encryption process
5) cors -> for cross orgin requests (supports secure data tranfers / requests between browsers and servers)
6) dotenv -> for environment variables
7) gridfs-stream -> for file upload. It describes how to split files into chunks during storage and reassemble them during retrieval
8) multer -> Multer is a node. js middleware for handling multipart/form-data , which is primarily used for uploading files.
9) multer-gridfs-storage -> GridFS storage engine for Multer to store uploaded files directly to MongoDb.
10) helmet -> Helmet. js is an open source JavaScript library that helps you secure your Node. js application by setting several HTTP headers
11) Morgan -> simplifies request loggin process for your application
12) jsonwebtoken
13) mongoose
*/

/* imports */
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import { register } from "./controllers/auth.js"
import { createPost } from "./controllers/posts.js"
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js"
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

/* Configurations */
const __filename = fileURLToPath(import.meta.url); //helps in grabbing the file url
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy : "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb" , extended : true }));
app.use(bodyParser.urlencoded({ limit: "30mb" , extended : true}));
app.use(cors());
app.use("/assets" , express.static(path.join(__dirname, "public/assets")));

/* 
Setting up file storage

github link for multer configs -> https://github.com/expressjs/multer
*/
// const storage = multer.diskStorage({
//   destination : function (req,res,cb){
//     cb(null , './public/assets')
//   },
//   filename : function(req,res,cb){
//     cb(null , req.file.originalname)
//   }
// })

const storage = multer.diskStorage({
  destination : "./public/assets",
  filename : function (req, file, cb){
    return cb(null, file.originalname)
  }
})

const upload = multer({ storage });

/* Routes with files  */

//we are trying to hit on the register route where we can upload a picture through our middleware which will store it in public/assests folder locally and register controller holds our logic to handle register functionality

app.post("/auth/register", upload.single("picture"), register); //should've been in auth route but we need upload variable from multer

//post route will also need a route with files because when we create a post , we need to allow and give user's a choice to upload a picture
app.post("/posts", verifyToken, upload.single("picture"), createPost)

/* Routes */
app.use("/auth" , authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* Mongoose Setup */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL , {
  useNewUrlParser : true , 
  useUnifiedTopology: true
}).then(()=>{
  app.listen(PORT , ()=>console.log(`Server port : ${PORT}`));
  /* Had some mock data at time of development which was removed - can use insert command to add mock data for testing pruposes. The mock data is on index.js */
}).catch((error)=>console.log(`${error} failed to connect`))


