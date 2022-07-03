require('dotenv').config();

const fileUpload = require('express-fileupload');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const { PORT } = process.env;

const app = express();

//Logger morgan
app.use(morgan('dev'));

// Deserializamos un body con formato "raw".
app.use(express.json({ limit: '50gb' }));

// Deserializamos un body con formato "form-data".
app.use(fileUpload({ limit: '50gb' }));

//Poder usar estaticos
app.use(express.static(path.join(__dirname, '/uploads')));

//Permitir las CORS
app.use(cors());

/**
 * #################
 * ## Middlewares ##
 * #################
 */
const authUser = require('./middlewares/authAdmin');

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

const {
    newPost,
    listPosts,
    getPostById,
    updatePost,
    getPostByCity,
} = require('./controllers/post');

//Nuevo post
app.post('/posts', authUser, newPost);

//Lista de los posts
app.get('/posts', listPosts);

//obtenemos un post por id
app.get('/posts/:id', getPostById);

app.get('/posts/cities/:city', getPostByCity);

//Actualizamos el post
app.patch('/posts/:id', authUser, updatePost);

/**
 * ######################
 * ## Middleware Error ##
 * ######################
 */
app.use((err, req, res) => {
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
