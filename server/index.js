const express = require('express');
const bodyParser = require('body-parser');

const db = require('../database-mysql');
const app = express();
const PORT = 3000;
const { updatePhrase } = require('../database-mysql/index.js');
const { addPhrase } = require('../database-mysql/index.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// UNCOMMENT TO START
 app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/api/phrases', (req, res) => {
  db.getAllPhrases((err, data) => {
    if (err) {
      console.error('Error fetching phrases:', err);
      return res.status(500).send('Failed to retrieve phrases');
    }
    res.json(data);
  });
});

//update methode 
app.patch('/api/phrases/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  updatePhrase(id, status, (err, result) => {
    if (err) {
      res.status(500).send('Error updating phrase');
    } else {
      res.status(200).send('Phrase updated');
    }
  });
});

// add methode 



app.post('/api/phrases', (req, res) => {
  const { kor, eng, rom, status } = req.body;

  if (!kor || !rom || !eng) {
    return res.status(400).send('Missing required fields');
  }

  addPhrase({ kor, eng, rom, status }, (err, result) => {
    if (err) return res.status(500).send('Failed to add phrase');
    res.status(201).send('Phrase added');
  });
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});