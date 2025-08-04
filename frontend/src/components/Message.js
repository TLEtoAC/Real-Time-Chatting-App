import React from 'react';
import './Message.css';

const Message = ({ message, currentUser }) => {
  const isOwnMessage = message.sender === currentUser;
  
  return (
    <div className={`message ${isOwnMessage ? 'own-message' : 'other-message'}`}>
      <div className="message-content">
        <div className="message-header">
          <span className="sender-name">{message.sender}</span>
          <span className="timestamp">
            {message.timestamp ? 
              new Date(message.timestamp).toLocaleTimeString() : 
              'Invalid time'
            }
          </span>
        </div>
        <div className="message-text">{message.text}</div>
      </div>
    </div>
  );
};

export default Message; 