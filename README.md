# API Gateway Implementation and Management

This project implements an API Gateway with JWT authentication, role-based access control, rate limiting, load balancing, caching, and security features. It serves as a middleware layer to manage requests to multiple backend services.

## Table of Contents

- [Install Dependencies](#install-dependencies)
- [Set Environment Variables](#set-environment-variables)
- [Start the API Gateway](#start-the-api-gateway)
- [Features Explained](#features-explained)
  - [Authentication and Authorization](#authentication-and-authorization)
  - [Rate Limiting](#rate-limiting)
  - [Routing and Load Balancing](#routing-and-load-balancing)
  - [Caching](#caching)
  - [Request/Response Transformation](#requestresponse-transformation)
  - [Security](#security)
- [API Endpoints](#api-endpoints)
  - [POST /api/login](#1-post-apilogin)
  - [GET /api/data](#2-get-apidata)
  - [POST /api/admin](#3-post-apiadmin)
- [How to Test the API](#how-to-test-the-api)

## Overview

The **API Gateway** is a middleware layer that integrates multiple backend services. It provides various features like authentication, rate limiting, load balancing, and caching to ensure secure and efficient request handling.

## Technologies Used

- **Node.js** - Backend framework.
- **Express.js** - Web framework for Node.js.
- **JWT (JSON Web Tokens)** - Authentication mechanism.
- **express-rate-limit** - Rate limiting middleware.
- **node-cache** - In-memory caching.
- **helmet** - Security middleware.
- **dotenv** - Load environment variables from `.env` file.


## Objective
  
The goal of this project is to implement an API Gateway with various essential features including authentication, authorization, rate limiting, routing, load balancing, caching, security, and request/response transformation. This API Gateway forwards requests to backend services and ensures scalability, availability, and security.

## Features Implemented

- **Authentication and Authorization**: JWT-based authentication and Role-Based Access Control (RBAC) to manage user roles and permissions.
- **Rate Limiting**: Limits the number of requests per IP to prevent abuse.
- **Routing and Load Balancing**: Routes API requests to appropriate backend services and simulates load balancing.
- **Request/Response Transformation**: Modifies headers and payloads for better management and readability.
- **Caching**: Caches responses to improve performance for frequent requests.
- **Security**: Ensures API security through best practices such as using `helmet` for securing headers.



## Setup Instructions
### Prerequisites

- Node.js installed (version 14.x or higher)
- A cloud environment (e.g., AWS, GCP, or Azure) for deployment (optional for local setup)


## Folder Structure
![File structure](https://github.com/MUSTAKIMSHAIKH2942/API-Gateway-Implementation-and-Management-Assignment/blob/main/testapigateway.png)

 
### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/api-gateway.git
   cd api-gateway
   
### Install dependencies:
Run the following command to install all necessary dependencies:
   
       ```bash
      npm install
s

## Set environment variables:
Create a .env file in the root of the project and add the following variables:
      ```bash
     PORT=3000
     JWT_SECRET=  your_secret_key
     BACKEND_SERVERS=http://localhost:4000,http://localhost:4001


Replace your_secret_key with a secure JWT secret key. The BACKEND_SERVERS variable should contain the URLs of your backend services.

### Start the API Gateway:

Run the following command to start the API Gateway:
    ```bash
     npm start
     or
     node server.js
     
The API Gateway will be running on port 3000 by default. You can change the port by modifying the .env file.


### Features Explained
1. Authentication and Authorization
JWT Authentication: The API Gateway uses JWT tokens for authenticating users. The authenticateToken middleware checks the token provided in the Authorization header of each request.

Role-Based Access Control (RBAC): The authorizeRole middleware restricts access to specific routes based on the user's role. For example, only Admin and Editor roles can access the /data route.

2. Rate Limiting
The API Gateway uses the express-rate-limit library to limit the number of requests an IP can make within a defined time window (15 minutes). The default configuration allows a maximum of 100 requests per 15 minutes.
3. Routing and Load Balancing
Routing: The API Gateway forwards incoming requests to appropriate backend services based on the routes defined in apiRoutes.js.

Load Balancing: A simple round-robin load balancer is used to distribute requests to multiple backend servers defined in the .env file.

4. Caching
The API Gateway caches responses from the backend servers for 1 minute using the node-cache library. This helps reduce load on the backend and improves response time for frequently requested data.
5. Request/Response Transformation
The transformRequestResponse middleware modifies incoming request headers and outgoing response headers. For example, it adds the x-forwarded-for header to the request and sets x-powered-by in the response.
6. Security
Helmet: The helmet middleware is used to secure HTTP headers and prevent common security vulnerabilities such as XSS and clickjacking.
HTTPS: While HTTPS is not enforced in this local setup, it is recommended to use HTTPS in a production environment for secure communication.

### API Endpoints

1. POST /api/login
Description: Authenticates a user and returns a JWT token.
Request body:
   
      ```bash
      {
        "username": "user1",
        "role": "Admin"
      }

Response:
      ```bash
         {
           "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluX3VzZXIiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MzUxOTUyOTcsImV4cCI6MTczNTE5ODg5N30.bOz_-VITq1Rt48Ew5h3IOnGMGvCnNZOR3kBw2bUagbQ"
         }


         

2. GET /api/data
Description: Fetches data from a backend server. Caches the response for subsequent requests.
Headers: Authorization: Bearer <JWT_TOKEN>
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluX3VzZXIiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MzUxOTUyOTcsImV4cCI6MTczNTE5ODg5N30.bOz_-VITq1Rt48Ew5h3IOnGMGvCnNZOR3kBw2bUagbQ
Content-Type: application/json
Response: Data from the backend service.

       ```bash
       {
         "message": "This is a test response",
         "data": [
           {
             "id": 1,
             "name": "Item 1",
             "description": "This is item 1"
           },
           {
             "id": 2,
             "name": "Item 2",
             "description": "This is item 2"
           },
           {
             "id": 3,
             "name": "Item 3",
             "description": "This is item 3"
           }
         ]
       }
       

3. POST /api/admin
Description: A route only accessible to users with the Admin role.
Headers: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluX3VzZXIiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MzUxOTUyOTcsImV4cCI6MTczNTE5ODg5N30.bOz_-VITq1Rt48Ew5h3IOnGMGvCnNZOR3kBw2bUagbQ

   Response:

   
            ```bash
           {
             "message": "Admin route accessed successfully"
           }

How to Test the API
Login: Make a POST request to /api/login with a valid username and role to obtain a JWT token.                                                          
Access Protected Routes: Use the JWT token to make GET and POST requests to /api/data and /api/admin. Ensure your role is authorized for each route.                    
Check Rate Limiting: Test rate limiting by making more than 100 requests in 15 minutes. You should receive a Too many requests message.                                  
Check Caching: Make a GET request to /api/data and check if the response is cached by making the same request again within 1 minute.                                        



