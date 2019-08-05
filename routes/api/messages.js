const express = require('express');
const router = express.Router();
const Message = require('../../models/Message')
router.get('/test',(req,res)=>{
  res.json({
    msg:'success'
  })
})
router.post('/addMessage', (req,res) => {
  const newMessage = new Message({
    username: req.body.username,
    content: req.body.content,
  });
  newMessage.save().then(message => res.json({
    success: true
  })).catch(err => console.log(err));
});
router.get('/findMessages', (req,res) => {
  // 查询数据库中是否拥有邮箱
  Message.find()
      .then(message => {
        res.json(message);
      })
      .catch(err => res.status(404).json(err));
});
module.exports = router;