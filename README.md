#### ME / Cat Fact API Implementation
### Overview
This is a simple Express.js API that returns the user information along with a random cat fact from the Cat Fact API and a timestamp
It includes the rate limiter to prevent abuse and uses environment variables for configuration.

### HOSTED API
Live URL: https://HNG-profile.up.railway.app/me

### Tech Stack
1.**Node.js**
2.**Express.js**
3.**dotenv**
4.**express-rate-limit**
5.**CORS**

### SETUP INSTRUCTIONS
## Clone Repository
git clone https://github.com/iamajirobamusty/HNG-Profile
cd HNG-profile

## Install dependencies
npm install

## Create an .env file
# Create a .env file in the project root and add the following variables:
PORT=3000
CAT_API_URL=https://catfact.ninja/fact
CAT_API_TIMEOUT=5000
NAME=YOUR_NAME
EMAIL=YOUR_EMAIL
STACK=Node.js/Express

### Run Locally
npm start

### Visit The App
http://localhost:3000/me

## Example Response
{
  "status": "success",
  "user": {
    "name": "Mustapha Ajiroba",
    "email": "ajiroba980@gmail.com",
    "stack": "Node.js/Express"
  },
  "timestamp": "2025-10-16T19:10:23.456Z",
  "fact": "Cats sleep for 70% of their lives."
}

## Dependencies
# Express
# CORS
# dotenv
# express-rate-limit

## Install at once
npm install express cors dotenv express-rate-limit

### Testing the endpoint
curl -s https://hng-profile.up.railway.app/me
## OR test in your browser
https://hng-profile.up.railway.app/me
## OR test locally
curl -s http://localhost:3000/me | jq

#### NOTES 
- The /me route is protected by a rate limiter (10 requests per minute per PI)

