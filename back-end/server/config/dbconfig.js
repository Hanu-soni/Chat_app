const mongoose =require('mongoose');
const dotenv=require('dotenv');

require('dotenv').config(); // Load environment variables from .env file
const dbURL = process.env.MONGO_URL;
// mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB Atlas');
//   })
//   .catch(error => {
//     console.error('Error connecting to MongoDB Atlas:', error);
//   });
mongoose.connect(dbURL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{
        console.log("connect to db")
    }).catch(error=>{
        console.log(error);
    })