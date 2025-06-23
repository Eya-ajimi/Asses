const mysql = require('mysql2');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as ID', connection.threadId);
});


const getAllPhrases = function(callback) {
  const query = 'SELECT * FROM phrases';
  connection.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Update a phrase's status
const updatePhrase = (id, status, callback) => {
  const query = 'UPDATE phrases SET status = ? WHERE id = ?';
  connection.query(query, [status, id], (err, results) => {
    if (err) {
      console.error('Error updating phrase:', err);
      return callback(err);
    }
    callback(null, results);
  });
};

// add methode 

const addPhrase = (phrase, callback) => {
  const query = 'INSERT INTO phrases (kor, eng, rom, status) VALUES (?, ?, ?, ?)';
  const params = [phrase.kor, phrase.eng, phrase.rom, phrase.status || 'Not yet'];

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Error inserting phrase:', err);
      return callback(err);
    }
    callback(null, results);
  });
};
//setp 8 

/*const addPhrase = ({ kor, eng, rom, status }, callback) => {
  const dueDate = new Date().toISOString().split('T')[0]; // today

  const query = `INSERT INTO phrases (kor, eng, rom, status, easiness_factor, interval_days, repetition, due_date)
                 VALUES (?, ?, ?, ?, 2.5, 0, 0, ?)`;

  connection.query(query, [kor, eng, rom, status, dueDate], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};
const getPhraseById = (id, callback) => {
  const query = 'SELECT * FROM phrases WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};*/




module.exports = {
  getAllPhrases,
  updatePhrase,
  addPhrase
};
