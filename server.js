const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const { raw } = require("express");


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res)=>
  res.sendFile(path.join(__dirname, '/db/db.json'))
);

app.post('/api/notes', function (req, res){
  console.log(req.body)
  fs.appendFile(__dirname + '/db/db.json', JSON.stringify(req.body), (err) => {
    if (err) throw err
    console.log("Success!")
  })
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);