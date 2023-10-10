const User = require('../models/user');

exports.addUser = ((req, res, next) => {
  const userName = req.body.userName;
  console.log(userName);
  const userEmail = req.body.userEmail;
  console.log(userEmail);
  const userPhoneNumber = req.body.userPhoneNumber;
  User.create({
    userName: userName,
    userEmail: userEmail,
    userPhoneNumber: userPhoneNumber
  })
  .then(result => {
    console.log('User created');
    res.send(result);
  })
  .catch(err => {
    console.log(err);
  }); 
})


exports.getUsers = ((req, res, next) => {
  User.findAll()
  .then(users => {
    console.log(users);
    res.send(users);
  })
  .catch(err => console.log(err));
})




exports.deleteUser = ((req, res, next) => {
  const userId = req.params.userID;
  console.log('user id to delete user is: ')
  console.log(userId);

  User.destroy({ where: { id: userId } }); 
  res.send('record deleted');
})



exports.editUser = ((req, res, next) => {
  const userId = req.params.userID;
  console.log('user id to update user is: ')
  console.log(userId);

  const userName = req.body.userName;
  console.log(userName);
  const userEmail = req.body.userEmail;
  console.log(userEmail);
  const userPhoneNumber = req.body.userPhoneNumber;
  
  User.update({userName: userName, userEmail: userEmail, userPhoneNumber: userPhoneNumber}, 
  {where : {id: userId}})
  .then(updatedUser => {
    console.log(updatedUser);
    res.send(updatedUser);
  })
  .catch(err => {
    console.log(err);
  });  
})