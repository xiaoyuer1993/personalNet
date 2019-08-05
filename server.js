const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path')
const db = require('./config/keys').mongoURI;
const messages = require('./routes/api/messages');
const notes = require('./routes/api/notes');
const users = require('./routes/api/users');
const bodyParser = require('body-parser');
mongoose.connect( db,{ useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
  app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
  })
  // 使用body-parser中间件
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use('/api/messages',messages);
  app.use('/api/notes',notes);
  app.use('/api/users',users);
  if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/dist'));
    app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
    })
  }
  app.listen(5000,()=>{
    console.log('this port is 5000');
  })