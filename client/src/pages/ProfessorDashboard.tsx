import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';
import * as professorService from '../services/professor.service';

const ProfessorDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await professorService.getCourses();
      setCourses(data);
    } catch (err) {
      setError('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await professorService.createCourse(title, description);
      setTitle('');
      setDescription('');
      setShowCreateForm(false);
      loadCourses();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create course');
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this course?')) {
      return;
    }

    try {
      await professorService.deleteCourse(id);
      loadCourses();
    } catch (err) {
      setError('Failed to delete course');
    }
  };

  const handleTogglePublish = async (course: Course) => {
    try {
      await professorService.updateCourse(course.id, {
        isPublished: !course.isPublished,
      });
      loadCourses();
    } catch (err) {
      setError('Failed to update course');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="course-header">
        <h1>My Courses</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? 'Cancel' : 'Create New Course'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {showCreateForm && (
        <div className="card">
          <h3>Create New Course</h3>
          <form onSubmit={handleCreateCourse}>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Create Course
            </button>
          </form>
        </div>
      )}

      {courses.length === 0 ? (
        <div className="empty-state">
          <p>No courses yet. Create your first course to get started!</p>
        </div>
      ) : (
        <div className="grid">
          {courses.map((course) => (
            <div key={course.id} className="card">
              <h3>{course.title}</h3>
              <p>{course.description || 'No description'}</p>
              <p>
                <strong>Status:</strong>{' '}
                {course.isPublished ? 'Published' : 'Draft'}
              </p>
              <p>
                <strong>Lessons:</strong> {course.lessons?.length || 0}
              </p>
              <div className="course-actions">
                <Link to={`/courses/${course.id}`}>
                  <button className="btn btn-primary">View</button>
                </Link>
                <button
                  className="btn btn-success"
                  onClick={() => handleTogglePublish(course)}
                >
                  {course.isPublished ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteCourse(course.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfessorDashboard;
