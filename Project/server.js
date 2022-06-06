require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const { PORT } = process.env;

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});