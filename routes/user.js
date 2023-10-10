const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();


router.post('/add-user', userController.addUser);

router.get('/get-users', userController.getUsers);

router.delete('/delete-user/:userID', userController.deleteUser);

router.put('/edit-user/:userID', userController.editUser);

module.exports = router;
