import { useEffect, useRef, useState } from 'react';
import { botResponses } from '../../data/aiResponses.js';

export default function AiChat({ messages, onChangeMessages }) {
  const [input, setInput] = useState('');
  const messagesRef = useRef(null);
  const responseTimers = useRef([]);

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => () => responseTimers.current.forEach(clearTimeout), []);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;

    const id = Date.now();
    onChangeMessages((current) => [...current, { id: `user-${id}`, text, isUser: true }]);
    setInput('');

    const responseTimer = setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      onChangeMessages((current) => [
        ...current,
        { id: `bot-${Date.now()}-${Math.random()}`, text: randomResponse, isUser: false },
      ]);
    }, 800 + Math.random() * 700);

    responseTimers.current.push(responseTimer);
  }

  return (
    <div className="ai-chat-view" style={{ display: 'flex' }}>
      <div className="ai-messages" ref={messagesRef}>
        {messages.map((message) => (
          <div className={`ai-msg ${message.isUser ? 'ai-msg-user' : 'ai-msg-bot'}`} key={message.id}>
            <div className="ai-avatar">{message.isUser ? 'EU' : 'AI'}</div>
            <div className="ai-bubble">{message.text}</div>
          </div>
        ))}
      </div>

      <div className="ai-input-area">
        <input
          className="ai-input"
          value={input}
          placeholder="Pergunte à IA..."
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              sendMessage();
            }
          }}
        />
        <button className="ai-send-btn" aria-label="Send message" onClick={sendMessage}>
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </div>
  );
}
