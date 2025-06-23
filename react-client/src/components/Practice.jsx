import React, { useEffect, useState } from 'react';

const Practice = () => {
  const [allPhrases, setAllPhrases] = useState([]);
  const [practicePhrases, setPracticePhrases] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/api/phrases')
      .then((res) => res.json())
      .then((data) => {
        setAllPhrases(data);

        // Prioritize: Not yet > Almost
        const filtered = [
          ...data.filter(p => p.status === 'Not yet'),
          ...data.filter(p => p.status === 'Almost')
        ];

        setPracticePhrases(filtered);
        setCurrentIndex(0);
      })
      .catch((err) => console.error('Failed to fetch phrases:', err));
  }, []);

  const handleNext = () => {
    if (practicePhrases.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % practicePhrases.length);
    setShowTranslation(false);
  };

  const updateStatus = (status) => {
    const phrase = practicePhrases[currentIndex];
    fetch(`http://localhost:3000/api/phrases/${phrase.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
      .then((res) => {
        if (res.ok) {
          // Refresh phrase list
          return fetch('http://localhost:3000/api/phrases');
        }
        throw new Error('Update failed');
      })
      .then((res) => res.json())
      .then((data) => {
        setAllPhrases(data);
        const updated = [
          ...data.filter(p => p.status === 'Not yet'),
          ...data.filter(p => p.status === 'Almost')
        ];
        setPracticePhrases(updated);
        setCurrentIndex(0);
        setShowTranslation(false);
      })
      .catch((err) => console.error('Error:', err));
  };

  if (practicePhrases.length === 0) {
    return (
      <div>
        <h1>Practice</h1>
        <p style={{alignContent:'center'}}>🎉 Congratulations! You've mastered all the phrases! 🎉</p>
      </div>
      
    );
  }

  const phrase = practicePhrases[currentIndex];
  if (!phrase) return <p>Loading...</p>;

  return (
    <div>
      
      <h1>Practice</h1>
      <div className="card">
        <div className="card-kor">{phrase.kor}</div>
        <div className="card-rom">{phrase.rom}</div>

        <div className="card-eng">
          <button onClick={() => setShowTranslation(!showTranslation)}>
            {showTranslation ? 'Hide Translation' : 'Reveal Translation'}
          </button>
          {showTranslation && <p>{phrase.eng}</p>}
        </div>

        <button onClick={() => updateStatus('Not yet')}>Not yet</button>
        <button onClick={() => updateStatus('Almost')}>Almost</button>
        <button onClick={() => updateStatus('Got it')}>Got it</button>
      </div>
      <div>
  <p style={{ textAlign: 'center', marginTop: '80px', fontWeight: 'bold' }}>
    Progress: {
      allPhrases.length > 0
        ? `${Math.round((allPhrases.filter(p => p.status === 'Got it').length / allPhrases.length) * 100)}%`
        : '0%'
    }
  </p>
</div>

    </div>
  );
};

export default Practice;
