import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Course, Enrollment } from '../types';
import * as studentService from '../services/student.service';

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'enrolled' | 'available'>('enrolled');
  const [enrolledCourses, setEnrolledCourses] = useState<Enrollment[]>([]);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'enrolled') {
        const data = await studentService.getEnrolledCourses();
        setEnrolledCourses(data);
      } else {
        const data = await studentService.getAvailableCourses();
        setAvailableCourses(data);
      }
    } catch (err) {
      setError('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId: string) => {
    try {
      await studentService.enrollInCourse(courseId);
      setActiveTab('enrolled');
      loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to enroll');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Student Dashboard</h1>

      {error && <div className="error">{error}</div>}

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'enrolled' ? 'active' : ''}`}
          onClick={() => setActiveTab('enrolled')}
        >
          My Courses
        </button>
        <button
          className={`tab ${activeTab === 'available' ? 'active' : ''}`}
          onClick={() => setActiveTab('available')}
        >
          Available Courses
        </button>
      </div>

      {activeTab === 'enrolled' ? (
        enrolledCourses.length === 0 ? (
          <div className="empty-state">
            <p>You are not enrolled in any courses yet.</p>
            <button
              className="btn btn-primary"
              onClick={() => setActiveTab('available')}
            >
              Browse Available Courses
            </button>
          </div>
        ) : (
          <div className="grid">
            {enrolledCourses.map((enrollment) => (
              <div key={enrollment.id} className="card">
                <h3>{enrollment.course.title}</h3>
                <p>{enrollment.course.description || 'No description'}</p>
                <p>
                  <strong>Professor:</strong> {enrollment.course.professor.name}
                </p>
                <p>
                  <strong>Lessons:</strong>{' '}
                  {enrollment.course.lessons?.length || 0}
                </p>
                <p>
                  <strong>Progress:</strong> {enrollment.progress}%
                </p>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${enrollment.progress}%` }}
                  />
                </div>
                <Link to={`/courses/${enrollment.course.id}`}>
                  <button className="btn btn-primary">Continue Learning</button>
                </Link>
              </div>
            ))}
          </div>
        )
      ) : availableCourses.length === 0 ? (
        <div className="empty-state">
          <p>No courses available at the moment.</p>
        </div>
      ) : (
        <div className="grid">
          {availableCourses.map((course) => (
            <div key={course.id} className="card">
              <h3>{course.title}</h3>
              <p>{course.description || 'No description'}</p>
              <p>
                <strong>Professor:</strong> {course.professor.name}
              </p>
              <p>
                <strong>Lessons:</strong> {course.lessons?.length || 0}
              </p>
              <button
                className="btn btn-success"
                onClick={() => handleEnroll(course.id)}
              >
                Enroll
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
