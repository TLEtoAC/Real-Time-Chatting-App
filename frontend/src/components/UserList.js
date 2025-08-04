import React from 'react';
import './UserList.css';

const UserList = ({ users, currentUser }) => {
  return (
    <div className="user-list">
      <h3>Online Users ({users.length})</h3>
      <div className="users-container">
        {users.map((user) => (
          <div 
            key={user} 
            className={`user-item ${user === currentUser ? 'current-user' : ''}`}
          >
            <div className="user-status">
              <span className="status-dot online"></span>
            </div>
            <span className="username">{user}</span>
            {user === currentUser && <span className="you-label">(You)</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList; 