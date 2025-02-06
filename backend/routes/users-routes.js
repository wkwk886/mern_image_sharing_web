const express = require('express');
const { check } = require('express-validator');//只需要check function

const usersControllers = require('../controllers/users-controllers');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();//router输出之后，app.js import使用



router.get('/', usersControllers.getUsers);

router.post(
  '/signup', 
    fileUpload.single('image'),
    [
        check('name')
          .not()
          .isEmpty(),
        check('email')
          .normalizeEmail() // Test@test.com => test@test.com
          .isEmail(),
        check('password').isLength({ min: 6 })
      ],
    usersControllers.signup);

router.post('/login', usersControllers.login);

module.exports = router;