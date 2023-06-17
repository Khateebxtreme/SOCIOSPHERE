import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      //All we will need to do is to check if the user id exists in the map and the value is going to be true if it exists so if a user likes a post , we will add him to the map and if the user dislike it then he will be removed from the map (using a map over array increases the performance)
      type: Map,
      of: Boolean
    },
    comments: {
      type: Array,
      default: []
    }
  },
  { timestamps : true }
);

const Post = mongoose.model("Post",postSchema);

export default Post