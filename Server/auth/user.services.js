const bcrypt = require('bcrypt');
const { db } = require('../utils/db');

function findUserByEmail(email) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

function createUserByEmailAndPassword(user) {
  user.password = bcrypt.hashSync(user.password, 12);
  
  console.log(user.mobileNumber);
  return db.user.create({
    data: user,
  });
}


function deleteUserById(id){
  return db.user.delete({
    where: {id},
  })
}

function updateUserById(id){
  return db.user.update({
    where: {id},
  })
}


function findUserById(id) {
  return db.user.findUnique({
    where: {
      id,
    },
    include: {
      Car: true
    },
  });
}
module.exports = {
  findUserByEmail,
  deleteUserById,
  updateUserById,
  findUserById,
  createUserByEmailAndPassword
};