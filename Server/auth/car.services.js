const bcrypt = require('bcrypt');
const { db } = require('../utils/db');

function createCar(car) {
  
  return db.car.create({
    data: car,
  });
}

function deleteCarById(id){
  return db.car.delete({
    where: {id},
  })
}


function findCarByLicence(licenseNumber) {
  return db.car.findUnique({
    where: {
      licenseNumber,
    },
    include: {
      owner: true
    },
  });
}

module.exports ={
  createCar,
  findCarByLicence,
  deleteCarById

}