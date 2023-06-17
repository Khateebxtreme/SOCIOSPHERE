import User from "../models/User.js";

/* Retrieving information from received data items */

export const getUser = async(req,res)=>{
  try{
    const { id } = req.params; //grabbing the id parameter value from our request
    const user = await User.findById(id)
    res.status(200).json(user)
  }
  catch(err){
    res.status(404).json({ message : err.message })
  }
}

export const getUserFriends = async(req,res) => {
  try{
    const { id } = req.params;
    const user = await User.findById(id);
    
    const friends = await Promise.all(
      user.friends.map((id)=>{
        return User.findById(id)
      })
    )
  
    //formatting our results in a structured way for our frontend (modifying the user schema before sending details to frontend)
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) =>{
        return { _id, firstName, lastName, occupation, location, picturePath }
      }
    );
  
    res.status(200).json(formattedFriends)
  }
  catch(err){
    res.status(404).json({ message : err.message })
  }
}

/* updation functionality to our users */

export const addRemoveFriend = async(req,res)=>{
  try{
    const { id, friendId } = req.params;
    const user = await User.findById(id)
    const friend = await User.findById(friendId)

    //checking to see if friendId is present in as one of user friends and if he/she is present, we will remove the friend from the user's friend list and removing our current user from that friend's list too.
    if(user.friends.includes(friendId)){
      user.friends = user.friends.filter((id) => id !== friendId)
      friend.friends = friend.friends.filter((element) => element !== id)
    }
    //if the user and the friend aren't friends then the friend would be added to user's friend list and vice versa.
    else{
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id)=>{
        return User.findById(id)
      })
    )
  
    //formatting our results in a structured way for our frontend (modifying the user schema before sending details to frontend)
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) =>{
        return { _id, firstName, lastName, occupation, location, picturePath }
      }
    );

    res.status(200).json(formattedFriends)
  }
  catch(err){
    res.status(404).json({ message : err.message })
  }
}