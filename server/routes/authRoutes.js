const{ registerNewUser,loginUser}=require('../controllers/authController');
const express=require('express');
const router=express.Router();

router.route('/reg').post(registerNewUser);
router.route('/login').post(loginUser);

module.exports=router;