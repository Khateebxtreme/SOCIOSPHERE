import Post from "../models/Post.js"
import User from "../models/User.js"

/* functionality to create posts for a user */

//image will be passed through in this function (refer to index.js file app.post routes to handle image posting)
export const createPost = async (req,res) => {
  try{
    //information sent from frontend to the server
    const { userId, description, picturePath} = req.body;
    const user = await User.findById(userId);

    //creating our new post and pushing it into the database
    const newPost = new Post({
      userId,
      firstName : user.firstName,
      lastName : user.lastName,
      location : user.location,
      description,
      userPicturePath: user.picturePath /* Profile image of the user */,
      picturePath,
      likes :  {} /* As a post starts with 0 likes so we keep an empty object as default */,
      comments : []
    })

    await newPost.save(); //storing the newly created post into the mongoDB

    const post = await Post.find(); //pulling up all the post documents from mongoDB to show the updated posts list to the user on the front end

    res.status(201).json(post); 
  }
  catch(err){
    res.status(409).json({ message : err.message })
  }
}

/* functionality to retrive all the posts from the database to reflect on the homepage feed of frontend  */

export const getFeedposts = async (req,res) => {
  try{
    const post = await Post.find(); //pulling up all the post documents from mongoDB to show the updated posts list to the user on the front end

    res.status(200).json(post);
  }
  catch(err){
    res.status(404).json({ message : err.message })
  }
}

/* functionality to retrieve a specefic user's posts for their feed */

export const getUserPosts = async (req,res) => {
  try{
    const { userId } = req.params;

    const post = await Post.find( { userId } ); //pulling up all the post documents for a specefic user from mongoDB

    res.status(200).json(post);
  }
  catch(err){
    res.status(404).json({ message : err.message })
  }
}

/* functionality to implement the like and dislike of posts */

export const likePost = async (req,res) => {
  try{
    const { id } = req.params; //to grab the id of a particular post from req.params (query string)
    const { userId } = req.body; //to grab the user id who likes or dislikes the post

    const post = await Post.findById(id); //getting all the posts relevant to the particular user id
    const isLiked = post.likes.get(userId); //checking in the likes section of post if the user id exists or not (that he/her has liked the post or not)

    if(isLiked){
      post.likes.delete(userId); //remove the like on post if it was already previously liked
    }
    else{
      post.likes.set(userId , true) // if the post was not initially liked then like the post and it is done by addding userId for that user to likes parameter for a particular post
    }

    //updating a specefic post if a change is made ( like and dislike ) and update its like and dislike section after modification
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes : post.likes },
      { new : true }
    )

    res.status(200).json(updatedPost);
  }
  catch(err){
    res.status(404).json({ message : err.message })
  }
}