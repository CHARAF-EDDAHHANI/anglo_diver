# Setup Guide for Anglo Diver LMS Platform

This guide will help you set up and run the Anglo Diver English Learning LMS Platform on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** or **yarn** package manager
- **Git** for cloning the repository

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/CHARAF-EDDAHHANI/anglo_diver.git
cd anglo_diver
```

### 2. Install Dependencies

Install dependencies for all parts of the application:

```bash
npm run install:all
```

Or manually:

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
cd ..
```

### 3. Set Up PostgreSQL Database

Create a PostgreSQL database for the application:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE anglo_diver;

# Create user (optional, if not using postgres user)
CREATE USER anglo_user WITH PASSWORD 'anglo_password';
GRANT ALL PRIVILEGES ON DATABASE anglo_diver TO anglo_user;

# Exit psql
\q
```

### 4. Configure Environment Variables

Copy the example environment file and configure it:

```bash
cd server
cp .env.example .env
```

Edit `server/.env` with your database credentials:

```env
PORT=3001
DATABASE_URL="postgresql://anglo_user:anglo_password@localhost:5432/anglo_diver?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"
NODE_ENV="development"
```

**Important:** Change the `JWT_SECRET` to a strong, random string in production!

### 5. Set Up Database Schema

Run Prisma migrations to create the database schema:

```bash
cd server
npx prisma migrate dev --name init
npx prisma generate
cd ..
```

This will:
- Create all necessary tables (users, courses, lessons, exercises, enrollments, etc.)
- Generate the Prisma Client for database access

### 6. Start the Application

#### Option A: Run Both Frontend and Backend Together

From the root directory:

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:3001`
- Frontend client on `http://localhost:3000`

#### Option B: Run Separately

In one terminal (Backend):
```bash
npm run dev:server
```

In another terminal (Frontend):
```bash
npm run dev:client
```

## Using the Application

### First Time Setup

1. Open your browser and navigate to `http://localhost:3000`
2. Click "Register" to create a new account
3. Choose your role:
   - **Professor**: To create and manage courses
   - **Student**: To enroll in and learn from courses

### For Professors

1. **Create a Course**:
   - Go to the Professor Dashboard
   - Click "Create New Course"
   - Enter course title and description
   - Click "Create Course"

2. **Add Lessons**:
   - Click "View" on any course
   - Click "Add Lesson"
   - Enter lesson title and content
   - Click "Create Lesson"

3. **Publish Course**:
   - Go back to Professor Dashboard
   - Click "Publish" on your course
   - Students can now see and enroll in the course

### For Students

1. **Browse Courses**:
   - Go to Student Dashboard
   - Click "Available Courses" tab
   - View all published courses

2. **Enroll in a Course**:
   - Click "Enroll" on any available course
   - The course will appear in "My Courses"

3. **Learn**:
   - Click "Continue Learning" on enrolled courses
   - View lessons sequentially
   - Complete exercises to track progress

## Docker Deployment (Optional)

If you prefer using Docker:

### Prerequisites
- Docker
- Docker Compose

### Steps

1. Make sure you're in the project root directory

2. Build and start all services:

```bash
docker-compose up -d
```

This will:
- Start PostgreSQL database
- Build and start the backend server
- Build and start the frontend client

3. Access the application at `http://localhost:3000`

4. To stop the services:

```bash
docker-compose down
```

5. To stop and remove all data:

```bash
docker-compose down -v
```

## Troubleshooting

### Database Connection Issues

If you encounter database connection errors:

1. Verify PostgreSQL is running:
   ```bash
   # On macOS/Linux
   sudo service postgresql status
   
   # On Windows (if using services)
   # Check PostgreSQL service in Services app
   ```

2. Check your `DATABASE_URL` in `server/.env`
3. Ensure the database exists and credentials are correct

### Port Already in Use

If ports 3000 or 3001 are already in use:

1. Change the port in `server/.env` (for backend)
2. Change the port in `client/vite.config.ts` (for frontend)

### Prisma Issues

If you encounter Prisma-related errors:

```bash
cd server
npx prisma generate
npx prisma migrate reset  # Warning: This will clear all data
```

## Development Tips

### Viewing Database

Use Prisma Studio to view and edit database records:

```bash
cd server
npx prisma studio
```

This opens a web interface at `http://localhost:5555`

### API Testing

The backend API includes a health check endpoint:

```bash
curl http://localhost:3001/api/health
```

You can use tools like Postman or curl to test API endpoints directly.

### Hot Reload

Both frontend and backend support hot reload:
- Frontend: Changes to React components reload automatically
- Backend: Changes to TypeScript files restart the server automatically

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in environment variables
2. Use a strong `JWT_SECRET`
3. Use a managed PostgreSQL database (not localhost)
4. Build the application:
   ```bash
   npm run build
   ```
5. Start the production server:
   ```bash
   npm start
   ```

## Getting Help

If you encounter issues:

1. Check the console output for error messages
2. Verify all prerequisites are installed correctly
3. Ensure environment variables are configured properly
4. Check that the database is running and accessible

## Next Steps

- Explore the codebase in `server/src` and `client/src`
- Customize the UI styling in `client/src/App.css`
- Add new features or modify existing ones
- Review the API documentation in the main README.md

Happy coding! 🚀
