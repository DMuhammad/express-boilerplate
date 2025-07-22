# Express.js Microservices Boilerplate

This boilerplate provides a solid foundation for building scalable and maintainable microservices using Node.js and Express.js. It incorporates essential features like authentication, authorization, and centralized logging, with a clear and modular directory structure to promote separation of concerns.

## Table of Contents

- [Express.js Microservices Boilerplate](#expressjs-microservices-boilerplate)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Project Structure](#project-structure)
  - [Prerequisites](#prerequisites)
  - [Setup Instructions](#setup-instructions)
  - [Key Concepts](#key-concepts)
    - [Authentication \& Authorization](#authentication--authorization)
    - [Logging](#logging)
    - [Error Handling](#error-handling)
  - [Extending This Boilerplate](#extending-this-boilerplate)

## Features

* **Flexible Authentication**: Supports email/password-based authentication and is designed to easily integrate with OAuth providers (e.g., Google Auth).
* **Role-Based Authorization**: Extensible authorization system to manage user access based on roles.
* **Centralized Logging**: Effective logging implementation for monitoring and debugging using Winston and Morgan.
* **Modular Directory Structure**: Clear separation of responsibilities for each component (controllers, services, models, routes, middlewares, validators, utils).
* **Global Error Handling**: Centralized mechanism for catching and formatting errors consistently.
* **Input Validation**: Utilizes Joi for robust input validation to ensure data integrity.
* **Environment Configuration**: Easy management of application configurations using `.env` files.

## Technologies Used

* **Node.js**: JavaScript runtime environment.
* **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
* **JWT (jsonwebtoken)**: For secure authentication tokens.
* **Bcrypt.js**: For password hashing.
* **Passport.js**: Authentication middleware for Node.js.
* **Joi**: For schema description and validation.
* **Winston**: A logger for just about everything.
* **Morgan**: HTTP request logger middleware for Node.js.
* **Helmet**: Helps secure Express apps by setting various HTTP headers.
* **CORS**: Middleware to enable Cross-Origin Resource Sharing.
* **Nodemon**: Utility that monitors for any changes in your source and automatically restarts your server during development.

## Project Structure

```
.
├── src/
│   ├── app.js                  # Express app setup, global middlewares, and main router
│   ├── config/
│   │   ├── index.js            # Environment variables and core app configuration
│   │   ├── database.js         # Placeholder for database connection setup (e.g., Mongoose/Sequelize)
│   │   ├── passport.js         # JWT Passport strategy definition
│   │   └── tokens.js           # JWT token types
│   ├── controllers/            # Handle request/response logic, call services
│   │   ├── auth.controller.js  # User registration, login, token management
│   │   └── user.controller.js  # User management (CRUD)
│   ├── middlewares/            # Express middlewares
│   │   ├── auth.middleware.js  # JWT authentication and authorization checks
│   │   ├── error.middleware.js # Global error handling middleware
│   │   └── validate.js         # Joi validation middleware
│   ├── models/                 # Database schema definitions (e.g., Mongoose schemas or Sequelize models)
│   │   ├── user.model.js       # User schema
│   │   └── token.model.js      # Token schema (for refresh tokens, password reset tokens)
│   ├── routes/                 # API route definitions
│   │   ├── index.js            # Main router combining all sub-routes
│   │   ├── auth.routes.js      # Authentication related routes
│   │   └── user.routes.js      # User related routes
│   ├── services/               # Core business logic, interacts with models
│   │   ├── auth.service.js     # User authentication logic
│   │   ├── user.service.js     # User management logic
│   │   └── jwt.service.js      # JWT generation and verification logic
│   ├── utils/                  # Utility functions
│   │   ├── ApiError.js         # Custom error class for operational errors
│   │   ├── catchAsync.js       # Wrapper for async controllers to handle errors
│   │   ├── helpers.js          # General helper functions (e.g., `pick` utility)
│   │   └── logger.js           # Winston logger setup and Morgan integration
│   └── validators/             # Joi validation schemas for request bodies/queries/params
│       ├── auth.validator.js   # Validation for auth requests
│       ├── custom.validation.js# Custom Joi validation rules (e.g., password strength)
│       └── user.validator.js   # Validation for user requests
├── tests/                      # Placeholder for tests
├── .env.example                # Example environment variables
├── .gitignore
├── package.json
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js**: v14.x or higher (LTS recommended)
* **npm** or **Yarn**: Package manager for Node.js
* **A Database**: While `src/config/database.js` is a placeholder, you'll need a database (e.g., MongoDB with Mongoose, PostgreSQL with Sequelize) configured for your specific microservice.

## Setup Instructions

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/your-username/express-microservices-boilerplate.git](https://github.com/your-username/express-microservices-boilerplate.git)
    cd express-microservices-boilerplate
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure environment variables**:
    Create a `.env` file in the root directory by copying `.env.example`:
    ```bash
    cp .env.example .env
    ```
    Then, open `.env` and fill in the necessary variables.
    ```dotenv
    NODE_ENV=development
    PORT=3000

    # Database (Example for MongoDB)
    # MONGODB_URL=mongodb://localhost:27017/your_microservice_db

    # JWT
    JWT_SECRET=a_very_long_and_random_secret_key_for_jwt_security
    JWT_ACCESS_EXPIRATION_MINUTES=30
    JWT_REFRESH_EXPIRATION_DAYS=30

    # Google OAuth (optional, leave empty if not used)
    # GOOGLE_CLIENT_ID=your_google_client_id
    # GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```
    **Note**: Ensure `JWT_SECRET` is a long, random string for production environments.

4.  **Integrate your chosen database**:
    Modify `src/config/database.js` to connect to your preferred database (e.g., Mongoose for MongoDB, Sequelize for PostgreSQL/MySQL). Define your models in `src/models/`.

5.  **Run the application**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will start on the port specified in your `.env` file (default: `3000`).

## Key Concepts

### Authentication & Authorization

* **JWT-based**: Uses JSON Web Tokens for stateless authentication.
* **Passport.js**: Integrated for handling JWT strategy.
* **`auth.middleware.js`**: Protects routes by verifying JWTs and enforcing role-based access control.
* **`token.model.js`**: Manages refresh tokens to allow users to obtain new access tokens without re-logging in.

### Logging

* **Winston**: A versatile logging library for structured and customizable logs.
* **Morgan**: HTTP request logger middleware, integrated with Winston for consistent output.
* **`logger.js`**: Centralizes logger configuration and provides streams for Morgan.

### Error Handling

* **`ApiError.js`**: A custom error class to differentiate between operational errors (e.g., invalid input, unauthorized access) and programming errors.
* **`error.middleware.js`**: Catches all errors, formats them consistently, and sends appropriate HTTP responses. It also logs errors.
* **`catchAsync.js`**: A utility to wrap asynchronous controller functions, ensuring that any unhandled promise rejections are caught and passed to the error handling middleware.

## Extending This Boilerplate

This boilerplate serves as a starting point for a single microservice. To build a complete microservices architecture, consider:

* **Inter-service Communication**: Implement communication patterns (e.g., Message Queues like RabbitMQ/Kafka, gRPC) between different microservices.
* **API Gateway**: Use an API Gateway (e.g., Nginx, Kong, API Gateway on AWS) to manage external requests and route them to the appropriate microservices.
* **Service Discovery**: Implement a service discovery mechanism (e.g., Eureka, Consul) for microservices to find each other.
* **Centralized Configuration**: Adopt a solution for managing configurations across multiple services (e.g., Spring Cloud Config, HashiCorp Consul).
* **Distributed Tracing**: Utilize tools like Jaeger or Zipkin to trace requests across multiple microservices for better debugging and monitoring.
* **Containerization & Orchestration**: Leverage Docker for containerizing your services and Kubernetes for orchestrating their deployment and scaling.
* **Health Checks**: Implement health check endpoints for robust monitoring.
