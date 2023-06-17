/* It's a component that deals with user image widget */
import { Box } from "@mui/material";

/* userImage is the profile image that we see for each user on the userWidget */
const UserImage = ({ image, size="60px" }) =>{
  return (
    <Box width={size} height={size}>
    <img
      style={{ objectFit : "cover", borderRadius: "50%"}}
      width={size}
      height={size}
      alt="user"
      src={`http://localhost:3001/assets/${image}`}
    />
    </Box>
  )
}

export default UserImage;