/* This component is reused in friend's list component and PostWidget widget */
/* On our web app, The friend component will represent every list item( different users ) in friend list */
/* On Each post made by a different user, friend component represents the top bar where we can see the user's image, name and a button to add him or her as friends */

import React from 'react'
import { 
  PersonAddOutlined,
  PersonRemoveOutlined 
} from '@mui/icons-material'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setFriends } from '../state'
import FlexBetween from './FlexBetween'
import UserImage from './UserImage'
import { useNavigate } from 'react-router-dom'

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector( ( state ) => state.user );
  const token = useSelector( ( state ) => state.token );
  const friends = useSelector( ( state ) => state.user.friends );

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  /* checking if the user is a friend or not. If the user is a friend, then remove friend icon is shown otherwise add friend icon is shown */
  console.log(friends);
  const isFriend = friends.find( (friend) => friend._id === friendId )

  //function responsible for a call that helps us adding a friend or removing a friend. Depending on the state of button ( same on posts and friend list component ), The change would also reflect in friend list component.
  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method : "PATCH",
        headers: {
          Authorization : `Bearer ${token}`,
          "Content-Type" : "application/json"
        }
      }
    );

    const data = await response.json();
    dispatch(setFriends({ friends : data }));
  }
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick = { () => {
            navigate(`/profile/${friendId}`)
            navigate(0);
            /* navigate(0) is a workaround solution for a bug that occurs when we try to access friend's profile of a friend to our current user because of URL updates with react-router but the components do not re-render. This will refresh the page whenever the upper navigate function is finished executing. */
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover" : {
                color : palette.primary.light,
                cursor : "pointer"
              }
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick = {() => patchFriend()}
        sx={{
          backgroundColor : primaryLight,
          p: "0.6rem"
        }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{color : primaryDark}}/>
        ) : (
          <PersonAddOutlined sx={{color : primaryDark}}/>
        )}
      </IconButton>
    </FlexBetween>
  )
}

export default Friend