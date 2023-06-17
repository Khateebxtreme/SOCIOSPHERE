import express from "express"
import {
  getUser,//get user details at one place
  getUserFriends, //get the list of friends for a particular user
  addRemoveFriend //add and remove friend functionality
} from "../controllers/users.js"

import { verifyToken } from "../middleware/auth.js"

const router = express.Router();

/* READ ROUTES  - routes to grab information coming from client side */

//this /:id will target users based on their id coming from users route and we can now grab the id coming from client side and interact with database using this particular id to retrieve the user information
router.get("/:id", verifyToken, getUser)
router.get("/:id/friends", verifyToken, getUserFriends)

/* update routes */

//updating the friends list for a specefic user
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);


export default router;