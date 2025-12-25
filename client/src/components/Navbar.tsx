import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-title">
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Anglo Diver
          </Link>
        </h1>
        <div className="navbar-actions">
          <span style={{ marginRight: '1rem' }}>
            {user.name} ({user.role === UserRole.PROFESSOR ? 'Professor' : 'Student'})
          </span>
          <button onClick={logout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
