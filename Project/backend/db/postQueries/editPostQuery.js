const { generateError } = require('../../helpers');
const getConnection = require('../getConnection');

const editPost = async (
    title,
    idUser,
    descriptions,
    city,
    suburb,
    imageName = '',
    attended,
    id
) => {
    let connection;

    attended = attended ? 1 : 0;

    try {
        connection = await getConnection();
        //creamos un array de post para poder verificar que no se publiquen el mismo problema de accesibilidad varias veces
        const [posts] = await connection.query(
            `SELECT P.id, P.title, P.descriptions, P.city, P.suburb, P.attended, P.image, P.createdAt  FROM posts P WHERE id=?`,
            [`${id}`]
        );

        //Si no hemos cambiado la imagen ponemos la que ya estaba
        if (imageName.length == 0) imageName = posts[0].image;

        if (posts.length <= 0) {
            throw generateError('No existe ese problema de accesibilidad', 403);
        }

        //generamos el nuevo post
        const [newPost] = await connection.query(
            `UPDATE posts SET title=?, idAdmin=?, descriptions=?, city=?, suburb=?, attended=?, image=? WHERE id=${posts[0].id}`,
            [title, idUser, descriptions, city, suburb, attended, imageName]
        );

        return newPost.inserId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editPost;
