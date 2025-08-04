import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import ChatBox from '../components/ChatBox';
import UserList from '../components/UserList';
import './ChatPage.css';

const ChatPage = ({ currentUser, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Connect to Socket.IO server
    const newSocket = io('http://localhost:5000', {
      auth: {
        username: currentUser
      }
    });
    setSocket(newSocket);

    // Handle connection errors
    newSocket.on('connect_error', (error) => {
      console.error('Connection failed:', error);
    });

    // Handle user login
    newSocket.emit('user_login', currentUser);

    // Listen for initial messages
    newSocket.on('load_messages', (messages) => {
      setMessages(messages);
    });

    // Listen for new messages
    newSocket.on('new_message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    // Listen for user joined
    newSocket.on('user_joined', (data) => {
      setMessages(prev => [...prev, data.message]);
      setOnlineUsers(data.users);
    });

    // Listen for user left
    newSocket.on('user_left', (data) => {
      setMessages(prev => [...prev, data.message]);
      setOnlineUsers(data.users);
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [currentUser]);

  const handleSendMessage = (messageText) => {
    if (socket && socket.connected) {
      try {
        socket.emit('chat message', messageText);
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };

  const handleLogout = () => {
    if (socket) {
      socket.disconnect();
    }
    onLogout();
    navigate('/');
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <div className="header-content">
          <h1>ChatApp</h1>
          <div className="user-info">
            <span className="current-user-name">{currentUser}</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </div>
      
      <div className="chat-main">
        <ChatBox 
          messages={messages}
          currentUser={currentUser}
          onSendMessage={handleSendMessage}
        />
        <UserList 
          users={onlineUsers}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default ChatPage; 