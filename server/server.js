const express = require('express');
const connectDB = require('./db/connection');
const app = express();
require('dotenv').config();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API running');
});

const PORT = process.env.PORT || 5000;
connectDB(process.env.DB_URL);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
