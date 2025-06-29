// frontend/pages/Discuss.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Discuss.css';

export default function Discuss() {
  const { user } = useAuth();
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('discussionMessages');
    return saved ? JSON.parse(saved) : [];
  });
  const [newMessage, setNewMessage] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('discussionMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const newMsg = {
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content-wrapper">
        <div className="main-content">
          {/* 🔝 Top bar */}
          <div className="top-section">
            <div className="top-card calendar-header-bar">
              <div className="calendar-actions">
                <input type="text" placeholder="Search discussion..." className="calendar-search" />
                <button className="create-event-btn">+ Add Bug</button>
              </div>
            </div>
          </div>

          {/* 💬 Discussion card */}
          <div className="card calendar-card">
            <div className="calendar-header">
              <h3>Team Discussions</h3>
              <hr />
            </div>

            <div className="discussion-body">
              <div className="messages-list">
                {messages.length === 0 && <p className="no-messages">No messages yet.</p>}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`message ${msg.userId === user.id ? 'own' : 'other'}`}
                  >
                    <div className="message-header">
                      <strong>{msg.userName}</strong>
                      <small>{new Date(msg.timestamp).toLocaleString()}</small>
                    </div>
                    <div className="message-text">{msg.text}</div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* ✍️ Input box */}
              <div className="message-input">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend}>Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}