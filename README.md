# MERN Blogs App

## Overview

**MERN Blogs App** is a user-friendly web application for browsing blogs and managing reviews. It features a sleek UI, authentication and search functionalities, and an admin panel for managing posts,users and comments and admin dashboard to view website statistics. Built with the MERN stack (MongoDB, Express, React, Node.js), it uses Redux Toolkit Query for state management and offers a RESTful API for seamless interaction.It also uses firebase for google auth and uploading images.

## Features

### User Functionality

- Browse blogs with an attractive UI.
- Search for a blog by search term,date and category.

### Authenticated User Functionality

- View and submit comments for blogs.
- Mange his profile.

### Admin Functionality

- Dashboard for managing the blog catalog.
- Create, update, and delete blogs.
- Manage users (delete users or user comments).

## Technologies Used

- **Frontend:** React, React-Router, Redux Toolkit Query
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT, Firebase for google auth
- **Image Upload:** Firabase
- **Styling:** Tailwind CSS, FlowBite

## Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/AliS/mern-blogs-app.git
   cd mern-blogs-app
   ```

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```plaintext
PORT
MONGO_URI
NODE_ENV
JWT_SECRET
```

### Install Dependencies

Install both backend and frontend dependencies with the following command:

```bash
npm install
```

### Running the Application

### Start the Backend Server

To start the backend server, use:

```bash
npm run backend
```

### Start the Frontend Server

To start the frontend server, use:

```bash
npm run frontend
```

To run both the backend and frontend simultaneously, use the following command:

```bash
npm run fullstack
```

### API Endpoints

#### User API

- **`POST /api/v1/auth/signup`** - Register as new user
- **`POST /api/v1/auth/signin`** - Sign in
- **`POST /api/v1/auth/google-auth`** - Sign in with google account
- **`POST /api/v1/auth/sign-out`** - Sign out

#### Auth API

- **`GET /api/v1/users`** - Get users
- **`DELETE /api/v1/users/deleteMe`** - delete current user
- **`DELETE /api/v1/users/:id`** - Delete a user
- **`UPDATE /api/v1/users/:id`** - Update a user
- **`GET /api/v1/users/:id`** - Get a user

#### Posts API

- **`GET /api/v1/posts`** - Get posts
- **`POST /api/v1/posts`** - Create a new post
- **`PUT /api/v1/posts/:id`** - Update a post by ID
- **`DELETE /api/v1/posts/:id`** - Delete a post by ID

#### Comments API

- **`GET /api/v1/comments`** - Get comments
- **`GET /api/v1/comments/:postId`** - Get comments for a post
- **`POST /api/v1/comments/:postId`** - Create post comment
- **`PATCH /api/v1/comments/:commentId`** - Like a comment
- **`PUT /api/v1/comments/:commentId`** - Update a comment
- **`DELETE /api/v1/comments/:commentId`** - Delete a comment

### Contributing

Feel free to open issues or submit pull requests. Contributions are welcome!

### License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.

### Acknowledgements

Thanks to the creators of the MERN stack and Redux Toolkit Query for their fantastic tools and libraries.
