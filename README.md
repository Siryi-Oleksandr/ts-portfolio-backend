# Bankfolio Backend Documentation

---

## Description

_Welcome to the backend documentation for Bankfolio, an application that empowers users to create and share their portfolios effortlessly. Bankfolio's backend is responsible for ensuring the seamless operation of the app's core features. This README provides an overview of the functionalities offered by the Bankfolio backend API._

---

## Table of Contents

- [Introduction](#documentation)
- [Features](#features)
- [Routes](#routes)
- [Technologies Used](#technologies)

---

## Introduction <a id="documentation"></a>

Bankfolio is a platform designed to help users create, manage, and share their portfolios with others. The backend plays a crucial role in handling user authentication, portfolio management, and providing access to project-related information.

---

## Features <a id="features"></a>

Bankfolio's backend provides the following key features:

- Portfolio Creation and Sharing: Users can create their own portfolios, containing detailed information about their projects, images, website links, and code repositories. Portfolios can be shared with other users, showcasing their achievements.

- Project Storage and Information: Bankfolio allows users to store their projects along with vital information such as project descriptions, images, and relevant links. This ensures that all project-related data is stored securely and can be accessed when needed.

- User Discovery: The backend offers intuitive search functionality, enabling users to effortlessly discover fellow users and explore their impressive projects. This feature encourages collaboration and networking among users.

---

## Routes <a id="routes"></a>

#### User Routes:

GET **/google**: _Initiates Google authentication with the required scopes._
GET **/google/callback**: _Handles the callback from Google authentication and performs Google OAuth._
GET **/**: _Retrieves a list of users._
POST **/register**: _Validates and registers a new user._
POST **/login**: _Validates and logs in a user._
POST **/logout**: _Requires authentication and logs out the user._
POST **/refresh**: _Validates and refreshes the user's authentication token._
GET **/current**: _Requires authentication and retrieves the current user's information._
GET **/:userId**: _Requires authentication and retrieves a user's information by ID._
PATCH **/update**: _Requires authentication and updates a user's information._
PATCH **/updateSubscription**: _Requires authentication and updates a user's subscription details._
PATCH **/changePassword**: _Requires authentication and allows a user to change their password._
POST **/forgotPassword**: _Initiates the process of resetting a forgotten password._
POST **/resetPassword**: _Validates and completes the process of resetting a password._
DELETE **/:userId**: _Requires authentication and deletes a user by ID._

#### Project Routes:

GET **projects/query**: _Retrieves a list of projects._
GET **projects/own**: _Requires authentication and retrieves projects owned by the authenticated user._
GET **projects/own/:userId**: _Requires authentication and retrieves projects owned by a specific user._
GET **projects/:projectId**: _Retrieves project information by project ID._
POST **projects/**: _Requires authentication and adds a new project._
PATCH **projects/:projectId**: _Requires authentication and updates project information._
DELETE **projects/:projectId**: _Requires authentication and deletes a project by project ID._

---

## Technologies Used <a id="technologies"></a>

- Node.js
- TypeScript
- Express
- MongoDB
- Mongoose
- Cloudinary
- Google Auth
- Joi
- Nodemailer

---
