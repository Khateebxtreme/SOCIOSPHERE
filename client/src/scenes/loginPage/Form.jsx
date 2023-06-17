import React from 'react'
import { useState } from 'react'
import { Box, Button, TextField, useMediaQuery, Typography, useTheme } from '@mui/material'
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { Formik } from "formik"
import * as yup from "yup"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLogin } from '../../state'
import Dropzone from "react-dropzone"
import FlexBetween from '../../components/FlexBetween'

/* Schema setup for our form validation using yup. This will determine how the form library will be saving the information passed to the form */
/* Schema for register form input */
const registerSchema = yup.object().shape({
  /* These attributes validates against the data we provide to check if a user enters or passes something in the form which is unwanted, and if something like that is passed, an error is thrown */
  firstName: yup.string().max(50).required("first name is required"),
  lastName: yup.string().max(50).required("last name is required"),
  email: yup.string().email("Invalid email").required("email is required "),
  password: yup.string().required("password is required").min(6, "password should be a minimum of six characters"),
  location: yup.string().required("location data is required"),
  occupation: yup.string().required("occupation is required"),
  picture: yup.string().required("Profile picture is required")
})

/* Schema for login form input with email and password attributes */
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required(" email is required "),
  password: yup.string().required("password is required").min(6, "password should be a minimum of six characters")
})

/* Earlier the schema set up the initial structure or validation, This will set up the initial values that the validation works on for the register route */
const initialValuesRegister = {
  firstName : "",
  lastName : "",
  email : "",
  password : "",
  location : "",
  occupation : "",
  picture: ""
}

/* Initial values on which our login validation works on */
const initialValuesLogin = {
  email : "",
  password : ""
}

/* Form component for register/login routes */
const Form = () => {
  /* Here, pageType refers to the state that dictates if a user wants a login page or a register page for our form. Inital value would be set to login page and suppose the user isn't registered then he can move on to register page and pageType state deals with exactly that. */
  const [pageType, setPageType] = useState("login");

  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("( min-width : 600px )");
  const isLogin = pageType === "login"; /* variable to check if we are on the login page or not*/
  const isRegister = pageType === "register"; /* variable to check if we are on the register page or not */

  const register = async (values, onSubmitProps) => {
    /* Every value that was created in the textField sections would reflect in the parameter values */
    /* As we have an image in our set of values, We will have to use formData instead of only passing the values in request's body. This basically allows us to send form info with image. This is a bit unconventional way to send image with request body*/
    const formData = new FormData();

    //we are going through every key value pair in values object and appending it to formData
    for(let value in values){
      formData.append(value, values[value])
    }
    /* Appending name of the picture being pushed in our register form */
    formData.append('picturePath', values.picture.name)

    const savedUserResponse = await fetch (
      "http://localhost:3001/auth/register",
      {
        method : "POST",
        body : formData
        /* Sending the form data to this API call */
      }
    )

    const savedUser = await savedUserResponse.json(); //saving the data for the user that is passed to the registeration form in a parseable manner
    onSubmitProps.resetForm(); //resetting the form to the initial state of the registeration form

    if(savedUser){
      //if we are successfull in saving a user then we change the page type to login instead of register
      setPageType("login")
    }
  }

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch (
      "http://localhost:3001/auth/login",
      {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(values)
      }
    )

    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if(loggedIn){
      // If the API call has succeded and the user is correctly authenticated
      dispatch(
        setLogin({
          user : loggedIn.user,
          token : loggedIn.token
        })
      )
      navigate("/home")
    }
  }

  const handleFormSubmit = async(values, onSubmitProps) => {
    /* The arguements of handleFormSubmit will come from formik */
    if(isLogin) await login(values, onSubmitProps);
    if(isRegister) await register(values, onSubmitProps);
  }

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={ isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={ isLogin ? loginSchema : registerSchema }
    >
    {({
      values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm
    }) => (
      /* Formik is basically grabbing the handleSubmit and passing it to our HTML form */
      <form onSubmit={handleSubmit}>
        <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" sx={{ "& > div" : { gridColumn : isNonMobile ? undefined : "span 4"}}}>
          {/* Grid template columns as defined splits our grid into 4 sections with min size of 0 and max size to 1fr. In the sx section, we are targeting any divs which is a child of the current box component and applying required styles to it. */}

          { isRegister && (
            <>
              <TextField 
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={Boolean(touched.firstName) && Boolean(errors.firstName) /* checking if firstName has been touched and there is an error in this textfield */}
                helperText = {touched.firstName && errors.firstName /* Shows the error if firstName has been touched and there is an error */}
                sx={{ gridColumn : "span 2"}/* In larger screens we will have a span of 2 and in smaller screens , we will have a span of 4 as in sx of our box */}
              />
              <TextField 
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={Boolean(touched.lastName) && Boolean(errors.lastName) /* checking if lastName has been touched and there is an error in this textfield */}
                helperText = {touched.lastName && errors.lastName /* Shows the error if lastName has been touched and there is an error */}
                sx={{ gridColumn : "span 2"}/* In larger screens we will have a span of 2 and in smaller screens , we will have a span of 4 as in sx of our box */}
              />
              <TextField 
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={Boolean(touched.location) && Boolean(errors.location) /* checking if location has been touched and there is an error in this textfield */}
                helperText = {touched.location && errors.location /* Shows the error if location has been touched and there is an error */}
                sx={{ gridColumn : "span 4"}}
              />
              <TextField 
                label="Occupation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.occupation}
                name="occupation"
                error={Boolean(touched.occupation) && Boolean(errors.occupation) /* checking if occupation has been touched and there is an error in this textfield */}
                helperText = {touched.occupation && errors.occupation /* Shows the error if occupation has been touched and there is an error */}
                sx={{ gridColumn : "span 4"}}
              />
              {/* Box component for putting in profile image in our registeration form */}
              <Box
                gridColumn="span 4"
                border={`1px solid ${palette.neutral.medium}`}
                borderRadius="5px"
                p="1rem"
              >
                <Dropzone
                  acceptedFiles=".jpg, .jpeg, .png" /* acceptable file extensions for dropzone */
                  multiple={false} /* limited only to a single file per upload */
                  onDrop = {
                    /* Callback function to initiate when the user actually uploads an image that decides what we actually do with the files */
                    (acceptedFiles)=>{
                      setFieldValue("picture", acceptedFiles[0])
                      /*setFieldValue is set for a specefic formik input and that input is handling pictures that are dropped from dropzone */
                    }
                  }
                 >
                 {({ getRootProps, getInputProps})=>(
                  <Box
                  {...getRootProps() /* props on the anon function are passed from dropzone */}
                    border = {`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    sx={{ "&:hover" : { cursor : "pointer"}}}
                  >
                    <input {...getInputProps()} />
                    {!values.picture ? (
                      <p> Add Picture </p>
                    ) : (
                      <FlexBetween>
                        <Typography>{ values.picture.name }</Typography>
                        <EditOutlinedIcon />
                      </FlexBetween>
                    )}
                  </Box>
                 )}
                </Dropzone>
              </Box>
            </>
          )}
          <TextField 
            label="Email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            name="email"
            error={Boolean(touched.email) && Boolean(errors.email) /* checking if email has been touched and there is an error in this textfield */}
            helperText = {touched.email && errors.email /* Shows the error if email has been touched and there is an error */}
            sx={{ gridColumn : "span 4"}}
          />
          <TextField 
            label="Password"
            type="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            name="password"
            error={Boolean(touched.password) && Boolean(errors.password) /* checking if password has been touched and there is an error in this textfield */}
            helperText = {touched.password && errors.password /* Shows the error if password has been touched and there is an error */}
            sx={{ gridColumn : "span 4"}}
          />
        </Box>

        {/* Submit buttons for the forms including the functionality for choosing login or register form */}
        <Box>
          <Button
            fullWidth
            type="submit"
            sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main}
            }}
          >
            {isLogin ? "LOGIN" : "REGISTER"}
          </Button>
          <Typography
            onClick = {()=>{
              setPageType( isLogin ? "register" : "login")
              resetForm();
            }}
            sx={{
              textDecoration : "underline",
              color : palette.primary.main,
              "&:hover" : {
                cursor : "pointer", 
                color : palette.primary.light
              }
            }}
          >
          {isLogin ? "Don't have an account, you can sign up here":"Already have an account, Login in here."}
          </Typography>
        </Box>
      </form>
    )}
    </Formik>
  )
}

export default Form;