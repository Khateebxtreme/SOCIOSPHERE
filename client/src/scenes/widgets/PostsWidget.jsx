import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "../../state"
import PostWidget from "./PostWidget"

const PostsWidget = ({ userId, isProfile=false }) => {
  const dispatch = useDispatch(); //to be able to use the redux store
  const posts = useSelector( (state) => state.posts ); //to grab the list of posts
  const token = useSelector( (state) => state.token )

  /* 
  This post widget will make two different types of API calls depending on the value of isProfile prop.
  By default, It is going to grab all the posts that are stored on the database to show us on our feed which can be seen on the homepage when a user is logged in and if the value of isProfile is true ( It is true when we visit a user's profile ) then only the posts that is relevant to the user will be grabbed for the feed
  */

  /* get all the posts for feed on the homepage */
  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method : "GET",
      headers : { Authorization : `Bearer ${token}`}
    })
    const data = await response.json();
    dispatch(setPosts({ posts : data })) //with the data we received from the backend, we will update the state posts with the new relevant data
  }

  /* get all the posts that are relevant for the user */
  const getUserPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
      method : "GET",
      headers : { Authorization : `Bearer ${token}`}
    })
    const data = await response.json();
    dispatch(setPosts({ posts : data })) //with the data we received from the backend, we will update the state posts with the new relevant data
  }

  //API call depending on the situations at hand
  useEffect(() => {
    if(isProfile){
      getUserPosts();
    }
    else{
      getPosts();
    }
  }, []);

  return (
    <>
      {/* Creating a component for each posts in our posts list that was received from backend */}
      { posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments
        }) => (
          <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
          />
        )
      )}
    </>
  )
}

export default PostsWidget