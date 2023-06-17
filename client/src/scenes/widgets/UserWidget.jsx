/* User Widget represents the widget box on left of a user's profile page or feed which shows user details and their social profiles including profile views and impressions*/

import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined
} from "@mui/icons-material"
import { Box, Typography, Divider, useTheme } from "@mui/material"
import UserImage from "../../components/UserImage"
import WidgetWrapper from "../../components/WidgetWrapper"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import FlexBetween from "../../components/FlexBetween"


const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state)=> state.token) //grabbing the token value from redux store
  const dark = palette.neutral.dark
  const medium = palette.neutral.medium
  const main = palette.neutral.main

  /* Pulling user data from the backend to show in UserWidget*/
  /* refer to server's auth middleware to see how header bearer token is being pulled */
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`,
    {
      method : "GET",
      headers : { Authorization : `Bearer ${token}`}
    }
    )
    const data = await response.json();
    setUser(data);
  }

  /* Whenever our component is rendered getUser will be called through useEffect hook to pull in a specefic user's data */
  useEffect(()=>{
    getUser();
  }, [])

  if(!user) return null; // if a user doesn't exist, don't return anything for the user widget

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends
  } = user;

  return (
    <WidgetWrapper>
      {/* Starting row to put in our data that was pulled in */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={ () => navigate(`/profile/${userId}`) }
      >
        <FlexBetween gap="1rem">
          <UserImage image={ picturePath }/>
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover" : {
                  color : palette.primary.light,
                  cursor : "pointer"
                }
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={ medium }>{parseInt(friends.length).toLocaleString()} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined/>
      </FlexBetween>

        <Divider/>

        {/* Second row will contain the user's location and occupation */}
        <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color : main }}/>
            <Typography color={ medium }>{ location }</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <WorkOutlineOutlined fontSize="large" sx={{ color : main }}/>
            <Typography color={ medium }>{ occupation }</Typography>
          </Box>
        </Box>

        <Divider/>

        {/* Third row will contain user's profile views count and impressions count which is data pulled from backend */}
        <Box p="1rem 0">
          <FlexBetween mb="0.5rem">
            <Typography color={medium}>Profile Views : </Typography>
            <Typography color={main} fontWeight="500">{parseInt(viewedProfile).toLocaleString()}</Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography color={medium}>Profile Impressions : </Typography>
            <Typography color={main} fontWeight="500">{parseInt(impressions).toLocaleString()}</Typography>
          </FlexBetween>
        </Box>

        <Divider/>

        {/* Fourth row will contain user's social profile links and buttons */}
        <Box p="1rem 0">
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">Social Profiles</Typography>
          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
              <img src={ require('../../assets/twitter.png' ) } alt="twitter"/>
              <Box>
                <Typography color={main} fontWeight="500">Twitter</Typography>
                <Typography color={medium}>Social Network</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color : main }}/>
          </FlexBetween>

          <FlexBetween gap="1rem">
            <FlexBetween gap="1rem">
              <img src={ require('../../assets/linkedin.png' ) } alt="linkedin"/>
              <Box>
                <Typography color={main} fontWeight="500">Linkedin</Typography>
                <Typography color={medium}>Network Platform</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color : main }}/>
          </FlexBetween>
        </Box>
    </WidgetWrapper>
  )
}

export default UserWidget;