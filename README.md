Title
---
Coding Assignment from Delvify

Project Description
---
A simple to-do list application where you can create, delete list and create, edit, delete tasks. Email will be sent to specified email address when task is completed or expired (not finished, only console log at the moment)

Installation Guide
---
```bash
//install all the dependency at the backend and start the server
cd api
yarn install
yarn dev

// installing all the dependency at the frontend and start the server
cd ../delvify_assignment
yarn install 
ionic serve
```

Dependency Used
---
Frontend:
1. react 
2. jest
3. ionic framework (for the easy styling)

Backend:
1. node JS
2. express JS
3. dotenv
4. cron (for scheduled job)
5. knex (for building SQL query)
6. nodemailer (for sending notification email)
7. objection (for building model in MVC architecture)