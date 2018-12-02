// The API toolkit for making REST systems easily
const express = require('express');
// A good solution for handling JSON data in routes
const bodyParser = require('body-parser');
// Node JS modules for filesystem access
const fs = require('fs');
// Our database connection
// This will be a JSON object of our programmers
// and can be accessed as if it was any other javascript
// object

const database = require('./programmers.json');

var myDB = [];
myDB.push(database);
// var fileRead = new window.FileReader();
// fileRead.readAsText(dabase);

console.log(myDB);

// Make an instance of our express application
const app = express();
// Specify our > 1024 port to run on
const port = 3000;

// Apply our middleware so our code can natively handle JSON easily
app.use(bodyParser.json());

// We must have our list of programmers to use
if (!fs.existsSync('./programmers.json')) {
  throw new Error('Could not find database of programmers!');
}

// Build our routes

app.get('/', (req, res) => {
  res.send(myDB);
});

app.get('/:id', (req, res) => {
  const id = req.params.id;
  var employee = searchForEmployeeById(id);
  res.send(employee);
});

app.put('/:id/:att/:value', (req, res) => {
  const id = req.params.id;
  const attribute = req.params.att;
  const value = req.params.value;
  
  var employee = searchForEmployeeById(id);
  employee[attribute] = value;
  res.send(employee);
});


// Allow users to post a new employee by passing json filename
app.post('/:file', (req, res) => {
  const filename = "./" + req.params.file;
  // const filename = './programmers.json';
  const empInfo = require(filename);
  const body = req.body; // Hold your JSON in here!
  myDB.push(empInfo);
  // body.push(empInfo);

  res.send(myDB);
});

app.get('/', (req, res) => {
  res.send(`Invalid get request`);
  console.log("Invalid get request");
});

// IMPLEMENT A ROUTE TO HANDLE ALL OTHER ROUTES AND RETURN AN ERROR MESSAGE

app.listen(port, () => {
  console.log(`She's alive on port ${port}`);
});

function searchForEmployeeById(id){
  var employee = [];
  for(var i in myDB){
    if (myDB[i].SID === id)
    console.log("found");
      return myDB[i];
  }
return [];
}

