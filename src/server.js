import http from "http";
import WebSocket from "ws";
import express from 'express';
import path from "path";
var http = require("http");
var WebSocket = require("ws");
var express = require("express");
var path = require("path");
// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database("./public/db/index.db");

const app = express();


app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"))
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on http://localhost:3000");
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
  console.log("브라우저와 연결됨");
  
  const sqlite3 = require('sqlite3').verbose();
  const db_name = path.join(__dirname, "db", "index.db");
  
  const db = new sqlite3.Database(db_name, err => {
    if(err) {
      return console.error(err.message);
    }
    console.log("index.db 데이터 베이스와 연결 성공");
  });

  const readSQL = "SELECT * FROM bong"

  db.all(readSQL, (err, rows) => {
    if(err) throw err;
    const dbReadDataList = [];
    for(let row of rows){
      console.log(row)
      dbReadDataList.push(row);
    }
    socket.send(JSON.stringify(dbReadDataList));
  })

  db.close();

  socket.on("close", () => console.log("브라우저와 연결이 끊김"))
  socket.on("message", (msg) => {
    console.log(JSON.parse(msg));
    var msg2 = JSON.parse(msg);

    const db = new sqlite3.Database(db_name, err => {
      if(err) {
        return console.error(err.message);
      }
      console.log("index.db 데이터 베이스와 연결 성공");
    });


    function addZero(date) {
      if (date < 10) {
        const zeroDate = ('00' + date).slice(-2);
        return zeroDate;
      }
      return date;
    }
    function datetime() {
      var date = new Date();
      var y = addZero(date.getFullYear());
      var m = addZero(date.getMonth() + 1);
      var d = addZero(date.getDate());

      var h = addZero(date.getHours());
      var tm = addZero(date.getMinutes());
      var s = addZero(date.getSeconds());
  
      return `${y}-${m}-${d} ${h}:${tm}:${s}`;
    }


    const SQLrun = [msg2.name, msg2.text, datetime()];
    const insertSQL = "INSERT INTO bong (name, detail, date) VALUES (?, ?, ?)";

    db.run(insertSQL, SQLrun, err => {
      if(err){
        console.log(err.message);
      }
      socket.send("작성 완료");
    });
    db.close() 
  })
});



server.listen(3000, handleListen);
