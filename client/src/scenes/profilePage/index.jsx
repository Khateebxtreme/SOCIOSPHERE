import { Box, useMediaQuery } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Navbar from "../navbar"
import FriendListWidget from "../widgets/FriendListWidget"
import MyPostWidget from "../widgets/MyPostWidget"
import UserWidget from "../widgets/UserWidget"
import PostsWidget from "../widgets/PostsWidget"


const ProfilePage = () => {
  const [user, setUser] = useState(null); //keeping the user specefic to this page so local state is used
  const { userId } = useParams(); //userId is grabbed from the url of the profile page
  const token = useSelector( (state) => state.token )
  const isNonMobileScreens = useMediaQuery( "(min-width : 1000px)" )

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}` , 
    {
      method : "GET",
      headers : { Authorization : `Bearer ${token}`}
    })

    const data = await response.json();
    setUser(data);
  }

  useEffect( () => {
    getUser();
  }, [])

  if(!user) return null;

  return (
    <Box>
      <Navbar/>
      <Box
        width="100%"
        padding="2rem 6%"
        display={ isNonMobileScreens ? "flex" : "block" }
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined }>
          <UserWidget userId={userId} picturePath={user.picturePath}/>
          <Box m="2rem 0"/>
          <FriendListWidget userId={userId}/>
        </Box>
        <Box
          flexBasis={ isNonMobileScreens ? "41%" : undefined }
          mt={ isNonMobileScreens ? "-2rem" : "2rem" }
        >
          <PostsWidget userId={userId} isProfile/>
        </Box>
        
      </Box>
    </Box>
  )
}

export default ProfilePage