// frontend/pages/Discuss.jsx
import React, { useState, useEffect } from 'react';
import '../styles/Discuss.css';

export default function Discuss() {
  const [message, setMessage] = useState('');
  const [discussion, setDiscussion] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('discussion')) || [];
    setDiscussion(stored);
  }, []);

  // Save to localStorage when updated
  useEffect(() => {
    localStorage.setItem('discussion', JSON.stringify(discussion));
  }, [discussion]);

  // Add new message
  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      user: 'You', // You can change to currentUser.name if using AuthContext
      text: message.trim(),
      timestamp: new Date().toLocaleString()
    };

    setDiscussion([...discussion, newMessage]);
    setMessage('');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content-wrapper">
        <div className="main-content">
          {/* 🔝 Top section */}
          <div className="top-section">
            <div className="top-card calendar-header-bar">
              <div className="calendar-actions">
                <input
                  type="text"
                  placeholder="Search discussion..."
                  className="calendar-search-input"
                />
                <button className="create-event-btn">+ Add Bug</button>
              </div>
            </div>
          </div>

          {/* 🧾 Discuss card */}
          <div className="card discuss-card">
            <div className="calendar-header">
              <h3>Team Discussion</h3>
              <hr />
            </div>

            <div className="discuss-body">
              <div className="messages">
                {discussion.length === 0 ? (
                  <p className="no-messages">No messages yet.</p>
                ) : (
                  discussion.map((msg) => (
                    <div className="message-card" key={msg.id}>
                      <div className="message-header">
                        <strong>{msg.user}</strong>
                        <span className="timestamp">{msg.timestamp}</span>
                      </div>
                      <p>{msg.text}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="message-input-area">
                <input
                  type="text"
                  placeholder="Write a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
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
