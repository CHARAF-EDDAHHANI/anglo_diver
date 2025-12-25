# Anglo Diver - English Learning LMS Platform

A content-agnostic English learning web application built as a technical platform for English professors and educational institutions.

## Overview

Anglo Diver is a robust, scalable Learning Management System (LMS) that provides:

- **For Professors**: Tools to create and manage teaching content, courses, and lessons
- **For Students**: Interface to consume content, practice learning, and track progress
- **Technology-Focused**: The developer delivers the platform technology, not the pedagogy

## Architecture

### Backend
- **Framework**: Node.js with Express and TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based authentication
- **API**: RESTful API design

### Frontend
- **Framework**: React with TypeScript
- **State Management**: React Context API
- **Routing**: React Router
- **Styling**: CSS Modules

## Features

### User Roles

#### Professors
- Create and manage courses
- Create and organize lessons within courses
- Add various content types (text, multimedia, exercises)
- Track student progress
- Manage course enrollment

#### Students
- Browse and enroll in available courses
- Access course content and lessons
- Complete exercises and practice activities
- Track personal learning progress
- View course history

### Core Functionality

1. **Course Management**
   - Create/Edit/Delete courses
   - Organize courses by categories
   - Set course visibility and access

2. **Content Management**
   - Create lessons with rich content
   - Support for multiple content types
   - Flexible content organization

3. **Learning Activities**
   - Exercise creation and management
   - Student practice interface
   - Progress tracking

4. **User Management**
   - Role-based access control
   - User authentication and authorization
   - Profile management

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/CHARAF-EDDAHHANI/anglo_diver.git
cd anglo_diver
```

2. Install dependencies for all packages:
```bash
npm run install:all
```

3. Set up environment variables:
```bash
# Server environment (.env in server directory)
cp server/.env.example server/.env
# Edit server/.env with your database credentials and JWT secret
```

4. Set up the database:
```bash
cd server
npx prisma migrate dev
npx prisma generate
cd ..
```

### Development

Run the development servers (both frontend and backend):
```bash
npm run dev
```

Or run them separately:
```bash
# Backend server (http://localhost:3001)
npm run dev:server

# Frontend client (http://localhost:3000)
npm run dev:client
```

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
anglo_diver/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── services/      # API service layer
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Utility functions
│   └── package.json
│
├── server/                # Express backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Express middleware
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Utility functions
│   ├── prisma/            # Database schema and migrations
│   └── package.json
│
└── package.json           # Root package.json
```

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Course Endpoints (Professor)

- `POST /api/courses` - Create a course
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course details
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Lesson Endpoints (Professor)

- `POST /api/courses/:courseId/lessons` - Create a lesson
- `GET /api/courses/:courseId/lessons` - Get course lessons
- `PUT /api/lessons/:id` - Update lesson
- `DELETE /api/lessons/:id` - Delete lesson

### Student Endpoints

- `GET /api/student/courses` - Get enrolled courses
- `POST /api/student/courses/:id/enroll` - Enroll in course
- `GET /api/student/courses/:id/progress` - Get course progress
- `POST /api/student/exercises/:id/submit` - Submit exercise

## Development Philosophy

This platform is designed as a **technical foundation** for English learning:

- **Content Agnostic**: The system doesn't dictate pedagogical methods
- **Flexible**: Professors define the content and structure
- **Scalable**: Built to handle growth in users and content
- **Maintainable**: Clean architecture with separation of concerns

## Technology Stack

- **Backend**: Node.js, Express, TypeScript, Prisma, PostgreSQL
- **Frontend**: React, TypeScript, React Router
- **Authentication**: JWT (JSON Web Tokens)
- **Development**: Concurrently for running multiple processes

## License

MIT License - see LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.