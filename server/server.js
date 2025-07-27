require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connection');
const authRoutes =require('./routes/authRoutes');
const app = express();
app.use(express.json());
app.use('/api/auth',authRoutes);

try{
connectDB(process.env.DB_URL);

app.listen(3000, () => console.log(`Server started on port 3000....\n`));


}catch(err){
console.log(`error occured\n${err}`);
}

