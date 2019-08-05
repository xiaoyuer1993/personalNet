const express = require('express');
const router = express.Router();
const noteTitleList = require('../../initData/noteTitleList')
const Note = require('../../models/Note');
router.get('/titles',(req,res)=>{
  res.json({
    noteTitleList
  })
})
router.post('/addNotes', (req,res) => {
  // 查询数据库中是否拥有邮箱
  console.log(User);
  console.log( req.body);
  const newNote = new Note({
    title: req.body.title,
    content: req.body.content,
  });
  newNote.save().then(note => res.json({
    success: true
  })).catch(err => console.log(err));
});
router.get('/findNotes', (req,res) => {
  // 查询数据库中是否拥有邮箱
  Note.find()
      .then(note => {
        res.json(note);
      })
      .catch(err => res.status(404).json(err));
});
module.exports = router;