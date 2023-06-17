//setting up redux toolkit state
import { createSlice } from "@reduxjs/toolkit"

//this essentially would be the state that will be stored in our global state and this is accessible through our entire application so we can grab data from it to anywhere we want so we won't have to pass in states and props down to different components.
const initialState = {
  //setting up our state with help of action and reducers
  mode: "light" /* represents both light and dark mode and can be configured globally */,

  /*setting initial values for some states */
  user: null,
  token: null,
  posts: []
}

export const authSlice = createSlice({
  /* A slice is the portion of Redux code that relates to a specific set of data and actions within the store 's state */
  name: "auth",
  initialState /* passing the initial state values to our slice */,
  /* reducers are basically a set of function like structure attached to a slice to modify global states ( here states in initial state) */
  reducers: {
    /* This function switches our state from light to dark mode and vice versa */
    setMode: (state)=>{
      //we are modifying the received states indirectly even though we can do it directly (just redux things)
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    /* We change our state's initial values of user and token from null to values provided through payload when a specefic user logs in i.e user's token and user's username */
    setLogin: (state, action) =>{
      /* actions are basically just params for our reducer functions */
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    /*reverts back the value of our states to initial values from user values when that user was logged in when a user logs out */
    setLogout: (state)=>{
      state.user = null;
      state.token = null;
    },
    /* When a user is logged in , The payload will hold the new values of states user and token so we can now set the friends value of this user to friends value of user that we got from the payload */
    setFriends: (state, action)=>{
      /* setting up value of friends in our local state for it to me kept */
      if(state.user){
        state.user.friends = action.payload.friends;
      }
      else{
        console.error("user friends are not existent, Touch grass knobhead")
      }
    },
    /* modify the posts from [] to [element 1, element 2, ...., element n] when a user is logged in */
    setPosts: (state, action)=> {
      state.posts = action.payload.posts;
    },
    /* update post values if modified during any sort of user actions with newer set of posts that holds original posts and post which were updated. */
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if(post._id === action.payload.post._id) return action.payload.post;
        return post;
      })

      state.posts = updatedPosts;
    }
  }
})

export const { setMode, setLogin, setLogout, setFriends, setPost, setPosts} = authSlice.actions;
export default authSlice.reducer;