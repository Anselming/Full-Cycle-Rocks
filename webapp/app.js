'use strict';

const express = require('express');
const mysql = require('mysql');
const url = require('url');

// Constants
const PORT = 8001;
const HOST = '0.0.0.0';
const app = express();

app.get('/save', (req, res) => {
  const queryString = url.parse(req.url, true).query;

  var con = mysql.createConnection({
    host: "full-database",
    user: "root",
    password: "123456",
    database: "fullcycle"
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Conectado com sucesso.");
    var sql = `INSERT INTO People (nome) VALUES ('${queryString.nome}');`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Inserido com sucesso!");
    });

    con.end(function (err) { 
      if (err) throw err;
      else  console.log('Conexão encerrada.') 
      });
  
  });
  

  res.send(`<strong>${queryString.nome}</strong> criado com sucesso.<br /><a href='http://localhost:8080/'>Voltar</a>`);

});

app.get('/', (req, res) => {

  var html = '<h1>Full Cycle Rocks!</h1>';

  html += "<form action='/save' method='GET'>";
  html += "   <label for='nome'>Nome:</label>";
  html += "   <input type='text' name='nome' />";
  html += "   <input type='submit' value='Enviar' />";
  html += "</form>";

  html += "<hr />";

  var con = mysql.createConnection({
    host: "full-database",
    user: "root",
    password: "123456",
    database: "fullcycle"
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Conectado com sucesso.");
    
    var sql = "SELECT * FROM People";
    con.query(sql, function (err, rawresult) {
      if (err) throw err;

      html += "<ul>";
      rawresult.forEach(r => { html += `<li>${r.id} - ${r.nome} </li>`;});
      html += "</ul>";
      
      html += "<hr />";
      res.send(html);

      con.end(function (err) { 
        if (err) throw err;
        else  console.log('Conexão encerrada.') 
        });
    });
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Server rodando http://${HOST}:${PORT}`);
});