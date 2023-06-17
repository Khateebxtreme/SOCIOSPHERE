/* This widget will allow users to create posts and push it to user feed. This will beon top of the page, just below the navbar and will be centered. */
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined
} from "@mui/icons-material"
import { Box, Divider, Typography, InputBase, useTheme, Button, IconButton, useMediaQuery } from '@mui/material'
import FlexBetween from "../../components/FlexBetween"
import Dropzone from "react-dropzone"
import UserImage from "../../components/UserImage"
import WidgetWrapper from "../../components/WidgetWrapper"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "../../state"


const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();

  /* This will represent an image button to open up the dropzone place for the image to drop on while posting on the webpage. */
  const [ isImage, setIsImage ] = useState(false);

  /* The image that we are actually dropping on the dropone */
  const [ image, setImage ] = useState(null);

  /* State to represent actual post content or description */
  const [ post, setPost ] = useState("");

  const { palette } = useTheme();

  /* _id will be used in the backend to keep track of the users that are actually posting the content */
  const { _id } = useSelector( (state) => state.user );

  /* token will be used for authorizing the user */
  const token = useSelector( (state) => state.token );

  const isNonMobileScreens = useMediaQuery( "( min-width : 1000px )" );
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  /* function that handles our post and makes relevant api calls to it */
  const handlePost = async () => {
    const formData = new FormData(); /* helps us in dealing with passing of image in the post */
    formData.append("userId", _id);
    formData.append("description", post);
    if(image){
      //if an image is uploaded then the code in this block will work
      formData.append("picture", image);
      formData.append("picturePath", image.name)
    }

    /* This will send the post information to the backend */
    const response = await fetch(`http://localhost:3001/posts`, {
      method : "POST",
      headers : { Authorization : `Bearer ${token}`},
      body : formData
    });

    const posts = await response.json(); //backend returning the list of updated posts after updation
    dispatch(setPosts({ posts })); // helps in taking care of the list of posts

    /* Resetting the form Image state and post state to default after uploading */
    setImage(null);
    setPost("");
  }

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="Kick off a post..."
          onChange={
            (e) =>
              setPost(
                e.target.value
              ) /* updates the state of Post with newly provided value */
          }
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        /* If they click the img button and want to add an image to their post, this chunk of code will be executed */
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg, .jpeg, .png" /* acceptable file extensions for dropzone */
            multiple={false} /* limited only to a single file per upload */
            onDrop={
              /* Callback function to initiate when the user actually uploads an image that decides what we actually do with the files */
              (acceptedFiles) => {
                setImage(acceptedFiles[0]);
              }
            }
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {
                    ...getRootProps() /* props on the anon function are passed from dropzone */
                  }
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p> Add Image here </p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  /* Adding the trash icon button if the user wants to remove the image after selection */
                  <IconButton
                    onClick={ () => setImage(null) }
                    sx={{ width : "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      <Divider sx={{ margin : "1.25rem 0" }}/>

      <FlexBetween>
        {/* For the icons below our image dropzone including mic, gif etc */}
        <FlexBetween
          gap="0.25rem"
          onClick={ () => setIsImage(!isImage) /* This will turn off or on the image dropzone */}
        >
          <ImageOutlined sx={{ color: mediumMain }}/>
          <Typography
            color={mediumMain}
            sx={{ "&:hover" : { cursor : "pointer", color : medium }}}
          >
            Image
          </Typography>
        </FlexBetween>

        {/* This block of code defines how our icons in create post widget will appear depending on the screen size */}
        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color : mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color : mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color : mediumMain }} />
              <Typography color={mediumMain}>Mic</Typography>
            </FlexBetween>
          </>
          ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color : mediumMain }}/>
          </FlexBetween>
          )
        }
        {/* This component handles the POST button in our create post widget */}
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color : palette.background.alt,
            backgroundColor : palette.primary.main,
            borderRadius : "3rem"
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
}

export default MyPostWidget