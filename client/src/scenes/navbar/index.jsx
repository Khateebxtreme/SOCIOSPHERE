import React from 'react'
import { useState } from 'react'
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery
} from "@mui/material"

import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close
} from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { setMode, setLogout } from "../../state"
import { useNavigate } from "react-router-dom"
import FlexBetween from "../../components/FlexBetween"

const Navbar = () => {
  /* This value represents if we want to open up the mobile menu when using small screens or not and this state is used to toggle that on and off. */
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)

  /* useDispatch is used to dispacth our actions that we set on our reducers */
  const dispatch = useDispatch();

  const navigate = useNavigate();

  /* Grabbing the user information from our state */
  const user = useSelector((state)=>state.user);

  /* useMediaQuery is a hook builtin to Material-UI that allows us to determine if current screen size of the user is below the given width or higher than it*/
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  /* Pulling out themes from theme.js file to get themes based on user configuration */
  const theme = useTheme();

  /* Colors to be used on the navbar */
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = user === null ? "Khateeb Anwer" : `${user.firstName} ${user.lastName}`.split(' ').slice(0,2).join(' ')
  
  /* Material UI has a Box component (present in FlexBetween component as a prop) allows us to pass in CSS properties to our component and use them as Component property and This can be only done with Box component whereas for others, we will have to use sx property to add styles */
  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        {/* clamp is a CSS function that determines a minimum, preferred and maximum value for a given proposition */}
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={
            () =>
              navigate(
                "/home"
              ) /* On clicking the logo on Navbar, we will be reverted back to homepage */
          }
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          SocioSphere
        </Typography>
        {isNonMobileScreens && (
          /* If our screen is above the threshold of a mobile screen, A search bar is added to the navbar */
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search " />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
      {/* Desktop Navigation -> Navigation process dealt with in Non-mobile screens */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          {/* This is the button responsible for switching between light and dark mode and dispatch is for action that is used to change the mode we defined in our redux state file */}
          <IconButton onClick={() => dispatch(setMode())}>
            {/* This is used to change the icon we will use for light / dark mode depending on the mode we are currently on */}
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          {/* Messages icon in the navbar */}
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          {/* Form control is for the drop down burger menu at top right of the page where we can see which user is logged in and also the logout button */}
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                /* Targeting MuiSvgIcon class in material UI and applying CSS styles to it */
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              {/* Menuitem components apart from logout will be essentially just buttons from the dropdown menu and logout will help us to logout from the current session to send us back to login page*/}
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick = { ()=> dispatch(setLogout()) }> Log Out </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
         onClick = { ()=> setIsMobileMenuToggled(!isMobileMenuToggled) }>
         {/* It will pop up an icon of a menu when a user is on small screen */}
         <Menu/>
        </IconButton>
      )}
      {/* Mobile Navigation - Navigation process for mobile sized screens */}
      {/* The next conditions suffices when we have mobile screens and the burger menu is toggled or set to on and This condition opens up a box that will have our icons in there */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
        position = "fixed"
        right = "0"
        bottom = "0"
        height = "100%"
        zIndex = "10"
        maxWidth = "500px"
        minWidth = "300px"
        backgroundColor = {background}
        >
        {/* Close Icon for our dropdown box */}
        <Box display="flex" justifyContent="flex-end" p="1rem">
          <IconButton
          onClick = { ()=> setIsMobileMenuToggled(!isMobileMenuToggled) } 
          >
            <Close/>
          </IconButton>
        </Box>
        {/* Menu Items for our dropdown list */}
        <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
          {/* This is the button responsible for switching between light and dark mode and dispatch is for action that is used to change the mode we defined in our redux state file */}
          <IconButton onClick={() => dispatch(setMode())} sx={{ fontSize: "25px" }}>
            {/* This is used to change the icon we will use for light / dark mode depending on the mode we are currently on */}
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          {/* Messages icon in the navbar */}
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          {/* Form control is for the drop down burger menu at top right of the page where we can see which user is logged in and also the logout button */}
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                /* Targeting MuiSvgIcon class in material UI and applying CSS styles to it */
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              {/* Menuitem components apart from logout will be essentially just buttons from the dropdown menu and logout will help us to logout from the current session to send us back to login page*/}
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick = { ()=> dispatch(setLogout()) }> Log Out </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
}

export default Navbar