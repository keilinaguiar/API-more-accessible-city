const { generateError } = require('../../helpers');
const getConnection = require('../getConnection');

const insertPost = async (
    title,
    idUser,
    descriptions,
    city,
    suburb,
    attended,
    image = ''
) => {
    let connection;

    try {
        connection = await getConnection();
        //creamos un array de post para poder verificar que no se publiquen el mismo problema de accesibilidad varias veces
        const [posts] = await connection.query(
            `SELECT id FROM posts WHERE title = ? AND city = ? AND suburb = ?`,
            [title, city, suburb]
        );

        if (posts.length > 0) {
            throw generateError(
                'Ya existe ese problema de accesibilidad registrado',
                403
            );
        }
        //generamos el nuevo post
        const [newPost] = await connection.query(
            `INSERT INTO posts (title, idAdmin, descriptions, city, suburb, attended, image) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [title, idUser, descriptions, city, suburb, attended, image]
        );

        return newPost.inserId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertPost;
