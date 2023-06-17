import { Box, Typography, useTheme } from "@mui/material"
import Friend from "../../components/Friend"
import WidgetWrapper from "../../components/WidgetWrapper"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setFriends } from "../../state"

const FriendListWidget = ({userId}) => {
  const dispatch = useDispatch();
  const {palette} = useTheme();
  const token = useSelector( ( state ) => state.token );
  const friends = useSelector( ( state ) => state.user.friends );

  //function to get the list of friends
  const getFriends = async() => {
    /* We are using an async function instead of grabbing all the user's friends from user state because if we click on someone else's profile, it will pull up the friend list of their profile on their profile page */
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method : "GET",
        headers : { Authorization : `Bearer ${token}`}
      }
    )

    const data = await response.json();
    //updating our current friends list with data received from backend
    dispatch(setFriends({ friends : data }))
  }

  useEffect(() => {
    getFriends();
  }, [])

  if(friends.length<1){
    return
  }
  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map( (friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle = {friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  )
}

export default FriendListWidget