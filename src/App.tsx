import './App.css';
import React, { useState } from 'react';
import { addFlashcards } from './openai';
import { FlashcardT } from './types/flascard';
import Flashcard from './component/Flashcard';

function FlashcardsApp() {
  const [topic, setTopic] = useState('');
  const [flashcards, setFlashcards] = useState<FlashcardT | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateFlashcards = async () => {
    if (!topic) {
      alert('Please enter a topic.');
      return;
    }

    if (topic.length < 10) {
      alert('The topic must be at least 10 characters long.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const newFlashcards = await addFlashcards(topic);
      setFlashcards(newFlashcards);
    } catch (err: any) {
      setError('Failed to generate flashcards: ' + err.message);
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className='wrap'>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic"
        minLength={10} title="Enter ten or more characters to find a topic"
      />
      <button onClick={handleGenerateFlashcards} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Flashcards'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {flashcards && (
        <div>
          <h3>Flashcards for Topic: {flashcards.topic}</h3>
          <div className="card-grid">
            {flashcards.cards.map((card) => (
              <Flashcard flashcard={card} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FlashcardsApp;

