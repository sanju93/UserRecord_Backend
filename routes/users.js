let express = require('express');
let passport = require('passport')

let router = express.Router();

let users_controller = require('../controller/usersController');

router.post('/signUp',users_controller.SignUp);
router.post('/signIN',users_controller.SignIN);
router.get('/AllUsers',passport.authenticate('jwt',{session : false}),users_controller.AllUsers);
router.delete('/delete/:id',passport.authenticate("jwt",{session : false}),users_controller.DeleteUser);
router.put('/edit/:id',passport.authenticate('jwt',{session : false}),users_controller.Edit);
router.get('/user/:id',passport.authenticate('jwt',{session : false}),users_controller.FetchUser);

module.exports = router;