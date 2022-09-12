//ATLAS USER PASSWORD: hHGIKL7USMU6y7RN

//Initial config
import express from 'express';
import mongoose from 'mongoose';
import Router from './routes/personRouter.js';


const app = express();

// Read JSON -> middlewares!
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

//API routes
app.use('/person', Router)


// Inital route / endpoint
app.get('/', (req, res) => {
  //show req

  res.json({message: 'Hi Express!'});
})

// Send port to Express
const DB_USER = 'aRTIE'; //@TO DO: PUT IN .ENV
const DB_PASSWORD = 'ctKoHdqrFGxt9Xig';

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.cbuvcd8.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
  console.log('Connected with MongoDB Atlas!')
  app.listen(3000);
})
.catch((err) => console.log('ERROR! ', err));
