Sleep Assessment Application
============================

Table of Contents
-----------------

-   [Introduction](#introduction)
-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Configuration](#configuration)
-   [Running the Application](#running-the-application)
-   [Testing the Application](#testing-the-application)
-   [Analytics](#analytics)
-   [Deployment](#deployment)
-   [Contributing](#contributing)
-   [License](#license)
-   [Acknowledgements](#acknowledgements)
-   [Contact](#contact)

* * * * *

Introduction
------------

The **Sleep Assessment Application** is a web-based platform that allows users to evaluate their sleep quality through a simple questionnaire. Users can sign up, log in, complete a sleep assessment, and view their results. The application also includes analytics features to track user engagement and assessment data.

* * * * *

Features
--------

-   **User Authentication**: Secure signup, login, and logout functionality using JWT.
-   **Sleep Assessment**: Users can start a sleep assessment session and answer questions.
-   **Results Display**: Users receive a sleep quality score after completing the assessment.
-   **Analytics**: Event logging and aggregation for user engagement and assessment data.
-   **Responsive Design**: Modern, user-friendly interface that adapts to different screen sizes.
-   **Secure Communication**: Password hashing with bcrypt and protected routes.

* * * * *

Tech Stack
----------

-   **Backend**:
    -   Node.js
    -   Express.js
    -   MongoDB (Mongoose ORM)
-   **Frontend**:
    -   EJS (Embedded JavaScript Templates)
    -   Bootstrap 5 (CSS framework)
-   **Authentication**:
    -   JSON Web Tokens (JWT)
    -   Bcrypt for password hashing
-   **Analytics**:
    -   MongoDB Aggregation Framework

* * * * *

Prerequisites
-------------

Before you begin, ensure you have met the following requirements:

-   **Node.js** installed (version 12 or higher recommended)
-   **MongoDB** installed and running locally or accessible via a cloud service
-   **Git** installed (optional, for cloning the repository)

* * * * *

Installation
------------

### 1\. Clone the Repository

bash

Copy code

`git clone https://github.com/yourusername/sleep-assessment-app.git`

Alternatively, download the ZIP file from the repository and extract it.

### 2\. Navigate to the Project Directory

bash

Copy code

`cd sleep-assessment-app`

### 3\. Install Dependencies

bash

Copy code

`npm install`

* * * * *

Configuration
-------------

### 1\. Environment Variables

Create a `.env` file in the root of your project with the following content:

dotenv

Copy code

`JWT_SECRET=your_jwt_secret
MONGO_URI=mongodb://localhost:27017/sleepAssessmentDB
PORT=3000`

-   **JWT_SECRET**: Replace `your_jwt_secret` with a secure, random string.
-   **MONGO_URI**: Update if your MongoDB instance is running on a different URI.
-   **PORT**: You can change the port number if needed.

### 2\. Update Configuration File

Ensure the `config.js` file correctly accesses the environment variables:

javascript

Copy code

`require('dotenv').config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  mongoURI: process.env.MONGO_URI,
  port: process.env.PORT || 3000,
};`

* * * * *

Running the Application
-----------------------

### 1\. Start the MongoDB Server

Ensure your MongoDB server is running. If installed locally, you can start it with:

bash

Copy code

`mongod`

### 2\. Start the Application

Run the following command in your terminal:

bash

Copy code

`npm start`

You should see:

arduino

Copy code

`Connected to MongoDB
App listening at http://localhost:3000`

* * * * *

Testing the Application
-----------------------

### 1\. Access the Application

Open your web browser and navigate to:

bash

Copy code

`http://localhost:3000/signup`

### 2\. User Signup

-   Go to the **Signup** page.
-   Fill in a unique **Nickname** and **Password**.
-   Click **Signup**.
-   You will be redirected to the **Login** page.

### 3\. User Login

-   Enter your **Nickname** and **Password**.
-   Click **Login**.
-   You will be redirected to the **Dashboard**.

### 4\. Starting a Sleep Assessment

-   On the **Dashboard**, click the **Start Sleep Assessment** button.
-   You will be redirected to the **Assessment** page.

### 5\. Completing the Assessment

-   Answer the questions on the **Assessment** page.
-   Click **Submit**.
-   You will be redirected to the **Results** page.

### 6\. Viewing Results

-   On the **Results** page, view your sleep quality score.
-   Click **Back to Dashboard** to return.

### 7\. Logout

-   On the **Dashboard**, click **Logout** to end your session.

* * * * *

Analytics
---------

### Running the Analytics Script

A script `analytics.js` is provided to perform analytics queries.

1.  **Ensure the Application is Running** (or stopped if preferred).

2.  **Run the Analytics Script**:

    bash

    Copy code

    `node analytics.js`

3.  **Review Analytics Output**:

    -   **Active Users Per Day**
    -   **Average Sleep Assessment Duration**
    -   **Answer Distribution for Question 4**
      
## Contributing

Contributions are welcome! Please follow these steps:

1.  **Fork the Repository**

    Click the "Fork" button at the top right of the repository page.

2.  **Clone Your Fork**

    bash

    Copy code

    `git clone https://github.com/yourusername/sleep-assessment-app.git`

3.  **Create a Branch**

    bash

    Copy code

    `git checkout -b feature/your-feature-name`

4.  **Make Changes**

    Implement your feature or fix.

5.  **Commit and Push**

    bash

    Copy code

    `git add .
    git commit -m "Add your message here"
    git push origin feature/your-feature-name`

6.  **Create a Pull Request**

    Go to the original repository and click **"New Pull Request"**.

* * * * *

License
-------

This project is licensed under the [MIT License](LICENSE).

* * * * *

Acknowledgements
----------------

-   [Node.js](https://nodejs.org/)
-   [Express.js](https://expressjs.com/)
-   [MongoDB](https://www.mongodb.com/)
-   [Bootstrap](https://getbootstrap.com/)
-   [EJS Templates](https://ejs.co/)
