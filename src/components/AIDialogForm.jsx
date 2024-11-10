import React, { useState } from 'react';
import axios from 'axios';

const AIDialogForm = () => {
  const [userMessage, setUserMessage] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userMessage.trim() === '') return;

    await sendMessageToAI(userMessage, setAiResponse, setError, setLoading);
  };

  const handleChange = (e) => {
    setUserMessage(e.target.value);
  };

  return (
    <div className="ai-dialog-container">
      <h2>Mande uma mensagem para a Inteligência Artificial</h2>
      <form onSubmit={handleSubmit} className="ai-form">
        <textarea
          value={userMessage}
          onChange={handleChange}
          placeholder="Escreva sua mensagem aqui..."
          rows="4"
          cols="50"
        />
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Envie uma mensagem'}
          </button>
        </div>
      </form>

      {aiResponse && (
        <div className="ai-response">
          <h3>Ela respondeu:</h3>
          <p>{aiResponse}</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

const sendMessageToAI = async (userMessage, setAiResponse, setError, setLoading) => {
  try {
    setLoading(true);
    
    const response = await axios.post('http://127.0.0.1:8000/', {
      text: userMessage,
    });

    setAiResponse(response.data.reply);
  } catch (err) {
    setError('Algo deu errado, tente novamente.');
  } finally {
    setLoading(false);
  }
};

export default AIDialogForm;
