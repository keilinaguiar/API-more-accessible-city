require('dotenv').config();

const fileUpload = require('express-fileupload');
const express = require('express');
const morgan = require('morgan');

const { PORT } = process.env;

const app = express();

//Logger morgan
app.use(morgan('dev'));

// Deserializamos un body con formato "raw".
app.use(express.json());

// Deserializamos un body con formato "form-data".
app.use(fileUpload());

/**
 * #################
 * ## Middlewares ##
 * #################
 */
const authUser = require('./middlewares/authUser');

/**
 * ########################
 * ## Endpoints admin ##
 * ########################
 */

const { loginAdmin } = require('./controllers/admin');

//login de Administrador
app.post('/login', loginAdmin);

/**
 * ######################
 * ## Endpoints post ##
 * ######################
 */

const getPosts = require('./controllers/post/getPosts');
const newPost = require('./controllers/post');

//Nuevo post
app.post('/post', authUser, newPost);

//Vista de los posts
app.get('/posts?keyword', getPosts);

/**
 * ######################
 * ## Middleware Error ##
 * ######################
 */
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).send({
        status: 'error',
        message: err.message,
    });
});

/**
 * ##########################
 * ## Middleware Not Found ##
 * ##########################
 */

app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found',
    });
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
