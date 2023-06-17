import { 
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined
} from '@mui/icons-material'
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material'
import FlexBetween from '../../components/FlexBetween'
import Friend from '../../components/Friend'
import WidgetWrapper from '../../components/WidgetWrapper'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPost } from '../../state'

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const dispatch = useDispatch();
  const token = useSelector( ( state ) => state.token );
  const [ isComments, setIsComments ] = useState(false); /* This determines if the comments list under each post is open or not */
  const loggedInUserId = useSelector( (state) => state.user._id )
  const isLiked = Boolean(likes[loggedInUserId]) /* checks if the post is liked by our logged in user or not. likes on post schema is defined as a hashmap which accepts key as user ids and it's value is true if post is liked and if the post is not liked by the user, the user id won't show up on the hashmap too. */
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  //function which is responsible for changing the count of likes on a post
  const patchLike = async() => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method : "PATCH",
      headers : {
        Authorization : `Bearer ${token}`,
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({ userId : loggedInUserId }) /* Backend keeps track whether the current logged in user has liked the post or not  */
    })

    const updatedPost = await response.json(); /* This will give us the updated post from the backend */
    dispatch(setPost({ post : updatedPost })) /* Updating the state of our post in the Redux store to reflect the change on the backend */
  }
  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
        <Typography color={main} sx={{ mt : "1rem" }}>
          {description}
        </Typography>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style ={{ borderRadius : "0.75rem", marginTop : "0.75rem" }}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color : primary }} />
                ) : (
                  <FavoriteBorderOutlined/>
                )}
              </IconButton>
              <Typography>{parseInt(likeCount).toLocaleString()}</Typography>
            </FlexBetween>
            <FlexBetween gap="0.3rem">
              <IconButton onClick={ () => setIsComments(!isComments)}>
                {/* This will open or remove the comment section in our posts */}
                <ChatBubbleOutlineOutlined/>
              </IconButton>
              <Typography>{parseInt(comments.length).toLocaleString()}</Typography>
            </FlexBetween>
          </FlexBetween>

          <IconButton><ShareOutlined/></IconButton>
        </FlexBetween>
        {isComments && (
          <Box mt="0.5rem">
            {comments.map((comment, i) => (
              <Box key={`${name}-${i}`}>
                <Divider/>
                <Typography sx={{ color : main, m : "0.5rem 0", pl : "1rem" }}>
                  {comment}
                </Typography>
              </Box>
            ))}
            <Divider/>
          </Box>
        )}
    </WidgetWrapper>
  )
}

export default PostWidget