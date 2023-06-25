# SOCIOSPHERE

**SocioSphere** is a powerful, responsive and highly user-friendly social media web application made using MERN Stack. It includes a number of core functionalities that a social media app should provide like the ability for users to create and register accounts, add and remove friends, share posts and engage in various social interactions.

## Table of Contents
- [Features](#features)
- [TechStack](#techstack)
- [Screens](#screens)
- [Run_Locally](#run_locally)
- [Notes](#notes)
- [Authors](#authors)
- [License](#license)

## Features
- Users can create an account by providing necessary details like name, email and password. Other details like occupation,location and a profile picture can also be provided on registeration.
- Accessible through all kinds of devices (Tablets , desktop , phones etc).
- The application also ensures secure web authentication and authorization process by implementing a login system that verifies user credentials.
- Users can add or remove friends and can also see their list of friends in the provided friend's list.
- Users can also create posts, upload images and share their experiences. They can also like or dislike posts on their feed.
- Users can also navigate to other user's profile by clicking on their name or profile pic.
- SocioSphere comes in with user friendly interface for better user experience.

## TechStack

**Front-End:** React, Material-UI, Redux-Toolkit

**Back-End:** Mongoose, Express.js, Node.js, Bcrypt, MongoDB

**Third Party Services:** Helmet, Formik, Yup, Multer, Morgan, JWT Authentication

## Screens

### User Registeration page

![user_registeration page](https://github.com/Khateebxtreme/SOCIOSPHERE/assets/39136324/323b6a63-9138-47c1-933d-032b50c824f2)

### User Login Page

![login page](https://github.com/Khateebxtreme/SOCIOSPHERE/assets/39136324/308cebff-99fb-44a1-9da0-ed6b02bda676)

### User Homepage ( Dark Mode )

![homepage (dark mode)](https://github.com/Khateebxtreme/SOCIOSPHERE/assets/39136324/22fa2353-d0fe-40fb-b28b-43ef29ef1cd3)

### User Homepage ( Light Mode )

![homepage (light mode)](https://github.com/Khateebxtreme/SOCIOSPHERE/assets/39136324/43f40314-3cfb-4994-8a12-562c0faad57a)

### Post Structure

![sample post](https://github.com/Khateebxtreme/SOCIOSPHERE/assets/39136324/f84275d9-72c6-4c21-89ea-9e11113f41c5)

### User FriendList Widget

![user friendlist](https://github.com/Khateebxtreme/SOCIOSPHERE/assets/39136324/6a37aab2-7a19-4c19-b3fe-3c5c5acae205)


## Run_Locally

Clone the project

```bash
  $ git clone https://github.com/Khateebxtreme/SOCIOSPHERE.git
```

Go to the project directory

```bash
  cd SOCIOSPHERE\client
```

Install dependencies

```bash
  npm install
```

Start the project

```bash
  npm run start
```

The backend is already deployed on Render so running the project locally doesn't require any focus on it.

## Notes

- **Hosting Services :** Netlify (Front-End), Render (Back-End)
- **Follow up :** Add the functionality to add comments, Fix the minor user state issue(friend of friend profile's) which can throw an error, Add the functionality to update user details (customization option) 

## Authors

- [@Khateebxtreme](https://github.com/Khateebxtreme)


## License

[MIT](https://choosealicense.com/licenses/mit/)
