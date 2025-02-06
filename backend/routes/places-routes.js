const express = require('express');
const { check } = require('express-validator');//只需要check function

const placesControllers = require('../controllers/places-controllers');
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();//router输出之后，app.js import使用

//get place by placeId
router.get('/:pid',placesControllers.getPlaceById);

//返回user的所有places
router.get('/user/:uid',placesControllers.getPlacesByUserId);

//create,update,delete 都需要jwt
router.use(checkAuth);

//create places
//2 middleware /, check
router.post(
  '/',
  fileUpload.single('image'),
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address')
      .not()
      .isEmpty()
  ],
  placesControllers.createPlace
);

//update
//patch: apply partial modifications to a resource on the server.
router.patch(
  '/:pid',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  placesControllers.updatePlace
);

//delete
router.delete('/:pid',placesControllers.deletePlace);

module.exports = router;