import express from "express"
import { getFeedposts, getUserPosts, likePost} from "../controllers/posts.js"
import { verifyToken  } from "../middleware/auth.js"

const router = express.Router()

/* READ - functionality to retrieve data items or information sent from client to server*/

// This method request will grab the user feed when we are on the homepage and the homepage will pickup every single post that exists in our database and curate it at the homepage.
router.get("/", verifyToken, getFeedposts); 

//functionality which involves user id to grab only the user's posts
router.get("/:userId/posts", verifyToken, getUserPosts);


/* UPDATE - functionality to update data that reflects changes on either the database or the frontend */

//functionality to like and unlike a post for a user (the post get saved for each users that liked it)
router.patch("/:id/like", verifyToken, likePost)

export default router;