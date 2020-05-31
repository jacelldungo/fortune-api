Versions Used: 

Node: 14.1.0

To run the api please execute this command:
nodemon server.js

If some packages are not present please execute:
npm install or npm update

Some routes are applied to test changes in data

To test the api via postman 
fortune-api.postman_collection.json 
can be imported

next are the reference below

GET /fortune
To get random GET /fortune/:id
To get specific PATCH /fortune/:id
To Update fortune


GET /users
- Get all users list
POST /users
- Add User
GET /validatetoken
- Check token validity
POST /auth
- Authenticate user

get users and get specific fortune can be used to test if data
are changed and is valid

Thanks!