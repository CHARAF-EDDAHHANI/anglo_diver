# API Documentation - Anglo Diver LMS Platform

Base URL: `http://localhost:3001/api`

## Rate Limiting

All API endpoints are rate-limited for security:
- **General API**: 100 requests per 15 minutes per IP
- **Authentication**: 5 requests per 15 minutes per IP (only failed requests counted)
- **Create Operations**: 20 requests per 15 minutes per IP

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User

**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe",
  "role": "STUDENT" | "PROFESSOR"
}
```

**Response:** `201 Created`
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "STUDENT"
  },
  "token": "jwt-token"
}
```

---

### Login

**POST** `/auth/login`

Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:** `200 OK`
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "STUDENT"
  },
  "token": "jwt-token"
}
```

---

### Get Current User

**GET** `/auth/me`

Get the authenticated user's information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "STUDENT"
}
```

---

## Course Endpoints (Professor Only)

### Create Course

**POST** `/courses`

Create a new course. Requires PROFESSOR role.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "English Grammar Basics",
  "description": "Introduction to English grammar"
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "title": "English Grammar Basics",
  "description": "Introduction to English grammar",
  "professorId": "uuid",
  "isPublished": false,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z",
  "professor": {
    "id": "uuid",
    "name": "Professor Name",
    "email": "professor@example.com"
  }
}
```

---

### Get Professor's Courses

**GET** `/courses`

Get all courses created by the authenticated professor.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "title": "English Grammar Basics",
    "description": "Introduction to English grammar",
    "isPublished": false,
    "professor": {
      "id": "uuid",
      "name": "Professor Name",
      "email": "professor@example.com"
    },
    "lessons": []
  }
]
```

---

### Get Course Details

**GET** `/courses/:id`

Get detailed information about a specific course.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "title": "English Grammar Basics",
  "description": "Introduction to English grammar",
  "isPublished": false,
  "professor": {
    "id": "uuid",
    "name": "Professor Name",
    "email": "professor@example.com"
  },
  "lessons": [
    {
      "id": "uuid",
      "title": "Lesson 1",
      "content": "Lesson content...",
      "order": 1,
      "exercises": []
    }
  ]
}
```

---

### Update Course

**PUT** `/courses/:id`

Update a course. Only the course owner can update.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "isPublished": true
}
```

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "title": "Updated Title",
  "description": "Updated description",
  "isPublished": true,
  "professor": {
    "id": "uuid",
    "name": "Professor Name",
    "email": "professor@example.com"
  }
}
```

---

### Delete Course

**DELETE** `/courses/:id`

Delete a course. Only the course owner can delete.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "message": "Course deleted successfully"
}
```

---

## Lesson Endpoints

### Create Lesson

**POST** `/lessons/courses/:courseId/lessons`

Create a lesson in a course. Requires PROFESSOR role and course ownership.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Introduction to Verbs",
  "content": "Detailed lesson content...",
  "order": 1
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "title": "Introduction to Verbs",
  "content": "Detailed lesson content...",
  "courseId": "uuid",
  "order": 1,
  "exercises": []
}
```

---

### Get Course Lessons

**GET** `/lessons/courses/:courseId/lessons`

Get all lessons for a specific course.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "title": "Introduction to Verbs",
    "content": "Detailed lesson content...",
    "order": 1,
    "exercises": []
  }
]
```

---

### Get Lesson

**GET** `/lessons/:id`

Get a specific lesson.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "title": "Introduction to Verbs",
  "content": "Detailed lesson content...",
  "order": 1,
  "course": {
    "id": "uuid",
    "title": "English Grammar Basics"
  },
  "exercises": []
}
```

---

### Update Lesson

**PUT** `/lessons/:id`

Update a lesson. Requires PROFESSOR role and course ownership.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Updated Lesson Title",
  "content": "Updated content",
  "order": 2
}
```

**Response:** `200 OK`

---

### Delete Lesson

**DELETE** `/lessons/:id`

Delete a lesson. Requires PROFESSOR role and course ownership.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "message": "Lesson deleted successfully"
}
```

---

## Exercise Endpoints (Professor Only)

### Create Exercise

**POST** `/exercises/lessons/:lessonId/exercises`

Create an exercise for a lesson.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Exercise 1",
  "description": "Complete the sentences",
  "content": "Exercise content and instructions...",
  "order": 1
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "title": "Exercise 1",
  "description": "Complete the sentences",
  "content": "Exercise content and instructions...",
  "lessonId": "uuid",
  "order": 1
}
```

---

### Update Exercise

**PUT** `/exercises/:id`

Update an exercise.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Updated Exercise",
  "content": "Updated content"
}
```

**Response:** `200 OK`

---

### Delete Exercise

**DELETE** `/exercises/:id`

Delete an exercise.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "message": "Exercise deleted successfully"
}
```

---

## Student Endpoints

### Get Available Courses

**GET** `/student/courses`

Get all published courses available for enrollment.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "title": "English Grammar Basics",
    "description": "Introduction to English grammar",
    "isPublished": true,
    "professor": {
      "id": "uuid",
      "name": "Professor Name",
      "email": "professor@example.com"
    },
    "lessons": []
  }
]
```

---

### Enroll in Course

**POST** `/student/courses/:id/enroll`

Enroll in a course. Requires STUDENT role.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "userId": "uuid",
  "courseId": "uuid",
  "enrolledAt": "2025-01-01T00:00:00.000Z",
  "progress": 0,
  "course": {
    "id": "uuid",
    "title": "English Grammar Basics",
    "professor": {
      "id": "uuid",
      "name": "Professor Name",
      "email": "professor@example.com"
    }
  }
}
```

---

### Get Enrolled Courses

**GET** `/student/enrolled`

Get all courses the student is enrolled in.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "courseId": "uuid",
    "enrolledAt": "2025-01-01T00:00:00.000Z",
    "progress": 25,
    "course": {
      "id": "uuid",
      "title": "English Grammar Basics",
      "professor": {
        "name": "Professor Name"
      },
      "lessons": []
    }
  }
]
```

---

### Get Course Progress

**GET** `/student/courses/:id/progress`

Get detailed progress for a specific enrolled course.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "enrollment": {
    "id": "uuid",
    "progress": 25,
    "course": {
      "id": "uuid",
      "title": "English Grammar Basics",
      "lessons": []
    }
  },
  "totalExercises": 10,
  "completedExercises": 3,
  "progressPercentage": 30
}
```

---

### Submit Exercise

**POST** `/student/exercises/:id/submit`

Submit an answer to an exercise.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "answer": "Student's answer to the exercise..."
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "userId": "uuid",
  "exerciseId": "uuid",
  "answer": "Student's answer to the exercise...",
  "completed": true,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "exercise": {
    "id": "uuid",
    "title": "Exercise 1"
  }
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Error message describing what went wrong"
}
```

### 401 Unauthorized
```json
{
  "error": "Not authenticated" | "Invalid token" | "No token provided"
}
```

### 403 Forbidden
```json
{
  "error": "Professor role required" | "Student role required" | "Not authorized"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 429 Too Many Requests
```json
{
  "error": "Too many requests from this IP, please try again later."
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Notes

1. All dates are in ISO 8601 format
2. UUIDs are used for all resource identifiers
3. Passwords are hashed using bcrypt before storage
4. JWT tokens expire after 7 days by default
5. Exercise submissions are marked as completed upon submission (content-agnostic design)
6. Progress is automatically calculated based on completed exercises
