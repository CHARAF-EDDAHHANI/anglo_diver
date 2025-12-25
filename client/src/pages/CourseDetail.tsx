import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Course, Lesson, UserRole } from '../types';
import * as professorService from '../services/professor.service';
import * as studentService from '../services/student.service';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [exerciseAnswer, setExerciseAnswer] = useState('');

  const isProfessor = user?.role === UserRole.PROFESSOR;

  useEffect(() => {
    loadCourse();
  }, [id]);

  const loadCourse = async () => {
    if (!id) return;

    try {
      const courseData = await professorService.getCourse(id);
      setCourse(courseData);

      const lessonsData = await professorService.getCourseLessons(id);
      setLessons(lessonsData);
    } catch (err) {
      setError('Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      const order = lessons.length + 1;
      await professorService.createLesson(id, lessonTitle, lessonContent, order);
      setLessonTitle('');
      setLessonContent('');
      setShowLessonForm(false);
      loadCourse();
    } catch (err) {
      setError('Failed to create lesson');
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!window.confirm('Are you sure you want to delete this lesson?')) {
      return;
    }

    try {
      await professorService.deleteLesson(lessonId);
      loadCourse();
    } catch (err) {
      setError('Failed to delete lesson');
    }
  };

  const handleSubmitExercise = async (exerciseId: string) => {
    if (!exerciseAnswer.trim()) {
      alert('Please provide an answer');
      return;
    }

    try {
      await studentService.submitExercise(exerciseId, exerciseAnswer);
      setExerciseAnswer('');
      alert('Exercise submitted successfully!');
    } catch (err) {
      setError('Failed to submit exercise');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!course) {
    return <div className="error">Course not found</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <p>
          <strong>Professor:</strong> {course.professor.name}
        </p>
        <p>
          <strong>Status:</strong> {course.isPublished ? 'Published' : 'Draft'}
        </p>
      </div>

      {error && <div className="error">{error}</div>}

      {isProfessor && (
        <>
          <div className="course-header">
            <h2>Lessons</h2>
            <button
              className="btn btn-primary"
              onClick={() => setShowLessonForm(!showLessonForm)}
            >
              {showLessonForm ? 'Cancel' : 'Add Lesson'}
            </button>
          </div>

          {showLessonForm && (
            <div className="card">
              <h3>Create New Lesson</h3>
              <form onSubmit={handleCreateLesson}>
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Content</label>
                  <textarea
                    className="form-textarea"
                    value={lessonContent}
                    onChange={(e) => setLessonContent(e.target.value)}
                    required
                    style={{ minHeight: '200px' }}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Create Lesson
                </button>
              </form>
            </div>
          )}
        </>
      )}

      <div className="lesson-list">
        {lessons.length === 0 ? (
          <div className="empty-state">
            <p>No lessons yet.</p>
          </div>
        ) : (
          lessons.map((lesson) => (
            <div key={lesson.id} className="card">
              <div className="course-header">
                <h3>
                  {lesson.order}. {lesson.title}
                </h3>
                {isProfessor && (
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteLesson(lesson.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
              {selectedLesson?.id === lesson.id ? (
                <>
                  <div style={{ whiteSpace: 'pre-wrap' }}>{lesson.content}</div>
                  
                  {lesson.exercises && lesson.exercises.length > 0 && (
                    <div style={{ marginTop: '2rem' }}>
                      <h4>Exercises</h4>
                      {lesson.exercises.map((exercise) => (
                        <div key={exercise.id} className="card">
                          <h5>{exercise.title}</h5>
                          {exercise.description && <p>{exercise.description}</p>}
                          <div style={{ whiteSpace: 'pre-wrap', marginBottom: '1rem' }}>
                            {exercise.content}
                          </div>
                          {!isProfessor && (
                            <>
                              <textarea
                                className="form-textarea"
                                placeholder="Your answer..."
                                value={exerciseAnswer}
                                onChange={(e) => setExerciseAnswer(e.target.value)}
                              />
                              <button
                                className="btn btn-success"
                                onClick={() => handleSubmitExercise(exercise.id)}
                                style={{ marginTop: '0.5rem' }}
                              >
                                Submit Answer
                              </button>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <button
                    className="btn btn-secondary"
                    onClick={() => setSelectedLesson(null)}
                    style={{ marginTop: '1rem' }}
                  >
                    Close
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => setSelectedLesson(lesson)}
                >
                  View Lesson
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
