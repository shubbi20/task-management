## Introduction
- Task Management API built using Node.js, TypeScript, Express.js, and MongoDB with Mongoose. The API provides endpoints for user authentication, task creation, task management, and role-based access control, allowing admins to manage tasks and users to interact with their own tasks.

- Technology used:- TypeScript , Node.js , Express.js , mongoose , Mongodb

## features
- User Authentication: JWT-based authentication to secure API endpoints.
- Role-Based Access Control: Admins have full control, while regular users have restricted access.
- Task Management: Create, update, view, and delete tasks with various status controls.
- Search and Filter: Filter tasks based on title, status, and due date.
- Middleware: Custom middleware for authentication and authorization.
- Validation: Data validation using Joi to ensure the correctness of input data.
- Postman Collection: A Postman collection is included in the repository to easily test the API.
- Written tests using Jest for user-service, covering maximum test coverage.

[![github:](https://img.shields.io/badge/my_github-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/shubbi20)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shubhamnegi20/)


## Getting Started

1. Clone the repo to your local machine:
```bash
git clone https://github.com/your-username/task-management-api.git
```
2. nstall Dependencies
```bash
npm i
```
3. Create a .env file in the project root. You can use .env.sample as a reference.

4. Run the Application
```bash
npm run dev
```

## Additional Point
- I have uploaded the Postman API collection to the repository.
- I’m using Nodemailer to send emails upon signup.
- I have also written tests using Jest, covering maximum test coverage.


