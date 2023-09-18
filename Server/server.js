const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv');
const corsOptions = require('./config/corsOptions');
const app = express()
const { isAuthenticated } = require('./middleware/isAuthenticated');
const {db} = require('./utils/db')
dotenv.config();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const { findUserById, deleteUserById, updateUserById } = require('./auth/user.services');
const { createCar, findCarByLicence, deleteCarById } = require('./auth/car.services');

const register = require('./routes/register');
const login = require('./routes/login');
const PORT = process.env.PORT || 3500;

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.get('/api/v1/user',isAuthenticated, async(req, res) => {
  const userId = req.query.id;
  console.log(userId);
  const user = await findUserById(userId);
  res.json(user)
  // res.json({"name":user.name, "email":user.email, "ID": user.id});

})
app.delete('/api/v1/user',isAuthenticated, async(req, res) => {
  const userId = req.query.id;
  console.log("Account Deleted-> " + userId );
  const user = await deleteUserById(userId);
  res.json(user)
  // res.json({"name":user.name, "email":user.email, "ID": user.id});

})

// app.put('/api/v1/user',isAuthenticated, async(req, res) => {
//   try{
//     const {name,  email, password } = req.body;
//    if (!name || !email || !password) {
//       res.status(400);
//       throw new Error('You must provide an email and a password.');
//     }
//      const user = await updateUserById({ name, email, password });
//      console.log("Account Updated-> " + user );
//      res.json({status: 'success', data: user})

//   }  catch (err) {
//     console.log(err);
//   }
  
  
  
//   // res.json({"name":user.name, "email":user.email, "ID": user.id});

// })


app.post('/api/v1/postCar',isAuthenticated, async(req, res) => {
  try{
    
     const { carName, licenseNumber,ownerId  } = req.body;
    if (!carName || !licenseNumber || !ownerId) {
      res.status(400);
      throw new Error('You must provide an licenseNumber and a carName.');
    }

    const existingUser = await findCarByLicence(licenseNumber);

    if (!existingUser) {
      res.status(403);
      throw new Error('Invalid Email credentials.');
    }


  } catch(e){
    console.log(e);
  }
  

  const car = await createCar(req.body);
  console.log(car);
  res.json(car);
  
})
app.get('/api/v1/car',isAuthenticated, async(req, res) => {
  const carId = req.query.id;
  console.log(carId);
  const car = await findCarByLicence(carId);
  console.log(car);
  res.json(car.owner.mobileNumber);
  
})

app.delete('/api/v1/car',isAuthenticated, async(req, res) => {
  const carId = req.query.id;
  console.log(carId);
  const car = await deleteCarById(carId);
  res.json(car);
  
})


app.post('/api/v1/send-verification',isAuthenticated, async (req, res) => {
  client.verify.services(process.env.TWILIO_SERVICE_SID)
    .verifications
    .create({to: `${req.body.phoneNumber}`, channel: 'sms'})
    .then(verification => console.log(verification.status))
    .catch(e => {
      console.log(e)
      res.status(500).send(e);
    });

  res.sendStatus(200);
});

app.post('/api/v1/verify-otp',isAuthenticated, async (req, res) => {
  const licenseNumber = req.body.licenseNumber;
  const OTPNumber = req.body.OTPNumber;
  const car = await findCarByLicence(licenseNumber);
  const num = car.owner.mobileNumber;
  console.log(num +" otp is "+ OTPNumber);
  const check = await client.verify.services(process.env.TWILIO_SERVICE_SID)
    .verificationChecks
    .create({to: num, code: OTPNumber})
    .catch(e => {
      console.log(e)
      res.status(500).send(e);
    });

  res.status(200).send(check);
});

app.use('/api/v1/auth', register);
app.use('/api/v1/auth', login);

app.all('*', (req, res) => {
  res.status(404).send('Sorry, page not exits');
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
