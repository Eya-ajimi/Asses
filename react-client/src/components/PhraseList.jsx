import React, { useEffect, useState } from 'react';
import AddPhrase from './AddPhrase.jsx';

const PhraseList = () => {
  const [phrases, setPhrases] = useState([]);

  const fetchPhrases = () => {
    fetch('http://localhost:3000/api/phrases')
      .then(res => res.json())
      .then(data => setPhrases(data));
  };

  useEffect(() => {
    fetchPhrases();
  }, []);

  return (
    <div>
      <h1>Phrase List</h1>
      <div className="phrases">
        <div className="phrase-table">
          <div className="phrase-header phrase-row">
            <div className="phrase-data">Korean</div>
            <div className="phrase-data">Romanization</div>
            <div className="phrase-data">English</div>
            <div className="phrase-data">Status</div>
          </div>
          {phrases.map((p) => (
            <div className="phrase-row" key={p.id}>
              <div className="phrase-data">{p.kor}</div>
              <div className="phrase-data">{p.rom}</div>
              <div className="phrase-data">{p.eng}</div>
              <div className="phrase-data">{p.status}</div>
            </div>
          ))}
        </div>
      </div>

     
      <AddPhrase onPhraseAdded={fetchPhrases} />
    </div>
  );
};

export default PhraseList;
