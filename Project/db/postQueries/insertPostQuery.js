const { generateError } = require('../../helpers');
const getConnection = require('../getConnection');

const insertPost = async (
    title,
    idUser,
    descriptions,
    city,
    suburb,
    attended,
    imageName = ''
) => {
    let connection;

    try {
        connection = await getConnection();
        //creamos un array de post para poder verificar que no se publiquen el mismo problema de accesibilidad varias veces
        const [posts] = await connection.query(
            `SELECT id FROM post WHERE title = ? AND city = ? AND suburb = ?`,
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
            `INSERT INTO post (title, idAdmin, descriptions, city, suburb, attended, imageName) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [title, idUser, descriptions, city, suburb, attended, imageName]
        );

        return newPost.inserId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertPost;
