const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
router.get('/test',(req,res)=>{
  res.json({
    msg:'success'
  })
})
router.post('/register', (req,res) => {
  // 查询数据库中是否拥有邮箱
  console.log(User);
  console.log( req.body);
  User.findOne({ email: req.body.email }).then(user => {
    if (user.body) {
      return res.status(400).json('邮箱已被注册!');
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
      });
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(user => res.json(user)).catch(err => console.log(err));
        });
      });
    }
  });
});
router.post('/login',(req,res) =>{
  console.log(req);
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email}).then(user =>{
    if(!user) {
      return res.status(404).json('用户不存在!');
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          res.json({
            success: true,
            email: email
          })
        } else {
          return res.status(400).json('密码错误!');
        }
      });
    }
  })
})
module.exports = router;