import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';
import './ChatBox.css';

const ChatBox = ({ messages, currentUser, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-box">
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="no-messages">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <Message 
              key={message.timestamp || index} 
              message={message} 
              currentUser={currentUser} 
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="message-input-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="message-input"
            rows="1"
          />
          <button type="submit" className="send-button" disabled={!newMessage.trim()}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox; 