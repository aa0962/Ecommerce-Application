const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json({ msg: 'This is Example' });
});

app.listen(PORT, () => {
  console.log('SERVER IS RUNNING....');
});

//routes
app.use('/user', require('./routes/userRouter'));
app.use('/api', require('./routes/categoryRouter'));
app.use('/api', require('./routes/productRouter'));
app.use('/api', require('./routes/upload'));

//connect MongoDB

const URI = process.env.MONGODB_URL;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.error(err);
  });
