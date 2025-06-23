import React, { useState } from 'react';

const AddPhrase = ({ onPhraseAdded }) => {
  const [kor, setKor] = useState('');
  const [rom, setRom] = useState('');
  const [eng, setEng] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/api/phrases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kor, rom, eng })  // ✅ use correct keys
    })
      .then(res => {
        if (res.ok) {
          setKor('');
          setRom('');
          setEng('');
          onPhraseAdded();
          alert('Phrase added!');
        } else {
          throw new Error('Failed to add phrase');
        }
      })
      .catch(err => alert(err.message));
  };

  return (
    <div style={{ marginTop: '30px', textAlign: 'center' }}>
      <h3>Add a New Phrase</h3>
      <form onSubmit={handleSubmit}>
        <input value={kor} onChange={(e) => setKor(e.target.value)} placeholder="Korean (Hangul)" required /><br />
        <input value={rom} onChange={(e) => setRom(e.target.value)} placeholder="Romanization" required /><br />
        <input value={eng} onChange={(e) => setEng(e.target.value)} placeholder="English" required /><br />
        <button type="submit">Add Phrase</button>
      </form>
    </div>
  );
};

export default AddPhrase;
