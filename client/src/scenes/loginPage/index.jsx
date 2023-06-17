import React from 'react'
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import Form from "./Form.jsx"

const LoginPage = () => {

  /* useTheme's variable helps us in picking up color palettes defined in theme.js  */
  const theme = useTheme();

  /* This variable is set to true if the current screen's width surpasses 1000px otherwise false. This denotes if the user is on a mobile based screen or using a desktop to access the site */
  const isNonMobileScreens = useMediaQuery("( min-width: 1000px )")

  return (
    <Box>
      {/* This will be the top half of the page holding our application name as the main header */}
      <Box width="100%" backgroundColor={theme.palette.background.alt} p="1rem 6%" textAlign="center">
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          SocioSphere
        </Typography>
      </Box>
      {/* This will be the part of next half of the page and this box is responsible for holding our login form */}
      <Box
        width={isNonMobileScreens? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor = { theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem"}}>
          Unleash your voice. Amplify your story. Make a difference.
        </Typography>
        {/* Form component that handles our Login form */}
        <Form/>
      </Box>
    </Box>
  );
}

export default LoginPage