# Reservaciones API

REST API for a reservation/booking management system built with NestJS, TypeORM, and MySQL.

## Features

- **Authentication** — JWT-based auth with login, register, and token validation. Role-based access control (admin, boss, employee, cliente).
- **Users** — CRUD for user accounts with roles and reservation counters.
- **Bookings** — Reservation management with date/time, associated service, employee, and state.
- **Services Provided** — Catalog of services with name, description, price, and duration.
- **States Reservations** — Configurable reservation states (e.g., pending, confirmed, cancelled) with color coding.
- **Employee Management** — Employee records linked to user accounts.
- **Employee Schedule** — Work schedules per employee with days, start/end times, and day-off flags.
- **Store Closure** — Store closure management for specific days, date ranges, or recurring patterns.

## Tech Stack

| Category    | Technology                          |
| ----------- | ----------------------------------- |
| Framework   | NestJS 10                           |
| ORM         | TypeORM 0.3                         |
| Database    | MySQL (mysql2 driver)               |
| Auth        | JWT + Passport (passport-jwt)       |
| Validation  | class-validator + class-transformer |
| Runtime     | Node.js + TypeScript                |
| Testing     | Jest                                |

## Prerequisites

- Node.js >= 18
- MySQL Server
- npm

## Installation

```bash
npm install
```

## Environment Configuration

Copy the example env file and fill in your credentials:

```bash
cp .env.example .env.development
```

For production:

```bash
cp .env.example .env.production
```

Then edit the values:

```env
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=your_user
DATABASE_PASSWORD=your_password
DATABASE_NAME=reservaciones
PORT=3000
JWT_SECRET=your_jwt_secret
```

> The app loads env files based on `NODE_ENV` (`.env.development` or `.env.production`).

## Running the App

```bash
# development (watch mode)
npm run start:dev

# production
npm run build
npm run start:prod
```

The API starts on the port defined in your env file (default: 3000).

## Database Migrations

```bash
# generate a migration from entity changes
npm run migration:generate

# run pending migrations
npm run migration:run

# revert the last migration
npm run migration:revert
```

## API Endpoints

All endpoints are prefixed with the base URL (default `http://localhost:3000`).

### Auth (`/auth`)

| Method | Route             | Description              |
| ------ | ----------------- | ------------------------ |
| POST   | `/auth/login`     | Login with email/password |
| POST   | `/auth/register`  | Register a new user       |
| POST   | `/auth/validate-token` | Validate JWT token   |

### Users (`/users`)

| Method | Route       | Description         |
| ------ | ----------- | ------------------- |
| GET    | `/users`    | List all users      |
| GET    | `/users/:id`| Get user by ID      |
| POST   | `/users`    | Create a user       |
| PATCH  | `/users/:id`| Update a user       |
| DELETE | `/users/:id`| Delete a user       |

### Bookings (`/bookings`)

| Method | Route         | Description            |
| ------ | ------------- | ---------------------- |
| GET    | `/bookings`   | List all bookings      |
| GET    | `/bookings/:id` | Get booking by ID    |
| POST   | `/bookings`   | Create a booking       |
| PATCH  | `/bookings/:id` | Update a booking    |
| DELETE | `/bookings/:id` | Delete a booking    |

### Services Provided (`/services-provided`)

| Method | Route                  | Description           |
| ------ | ---------------------- | --------------------- |
| GET    | `/services-provided`   | List all services     |
| GET    | `/services-provided/:id` | Get service by ID  |
| POST   | `/services-provided`   | Create a service      |
| PATCH  | `/services-provided/:id` | Update a service   |
| DELETE | `/services-provided/:id` | Delete a service   |

### States Reservations (`/states-reservations`)

| Method | Route                     | Description                  |
| ------ | ------------------------- | ---------------------------- |
| GET    | `/states-reservations`    | List all states              |
| GET    | `/states-reservations/:id`| Get state by ID             |
| POST   | `/states-reservations`    | Create a state               |
| PATCH  | `/states-reservations/:id`| Update a state               |
| DELETE | `/states-reservations/:id`| Delete a state               |

### Employee Management (`/employees-management`)

| Method | Route                       | Description             |
| ------ | --------------------------- | ----------------------- |
| GET    | `/employees-management`     | List all employees      |
| GET    | `/employees-management/:id` | Get employee by ID      |
| POST   | `/employees-management`     | Create an employee      |
| PATCH  | `/employees-management/:id` | Update an employee      |
| DELETE | `/employees-management/:id` | Delete an employee      |

### Employee Schedule (`/employees-schedules`)

| Method | Route                      | Description              |
| ------ | -------------------------- | ----------------------- |
| GET    | `/employees-schedules`     | List all schedules       |
| GET    | `/employees-schedules/:employeeId` | Get schedule by employee |
| POST   | `/employees-schedules`     | Create a schedule        |
| PATCH  | `/employees-schedules/:id` | Update a schedule       |
| DELETE | `/employees-schedules/:id` | Delete a schedule       |

### Store Closures (`/store-closures`)

| Method | Route                  | Description            |
| ------ | ---------------------- | ---------------------- |
| GET    | `/store-closures`      | List all closures      |
| GET    | `/store-closures/:id`  | Get closure by ID      |
| POST   | `/store-closures`      | Create a closure       |
| PATCH  | `/store-closures/:id`  | Update a closure       |
| DELETE | `/store-closures/:id`  | Delete a closure       |

## Testing

```bash
# unit tests
npm run test

# watch mode
npm run test:watch

# coverage
npm run test:cov

# e2e tests
npm run test:e2e
```

## User Roles

| Role     | Value      | Description                               |
| -------- | ---------- | ----------------------------------------- |
| Admin    | `admin`    | Full system access                        |
| Boss     | `boss`     | Management-level access                   |
| Employee | `employee` | Staff with schedule and booking access     |
| Cliente  | `cliente`  | Default role for registered customers      |