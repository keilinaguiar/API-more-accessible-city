const { generateError } = require('../../helpers');
const getConnection = require('../getConnection');

const selectPostByIdQuery = async (id) => {
    let connection;
    try {
        connection = await getConnection();
        const [posts] = await connection.query(
            `SELECT P.title, P.descriptions, P.city, P.suburb, P.attended, P.image, P.createdAt  FROM posts P WHERE id=?`,
            [`${id}`]
        );

        if (posts.length < 1) {
            throw generateError('Post no encontrado', 404);
        }
        return posts[0];
    } finally {
        if (connection) connection.release();
    }
};


module.exports = selectPostByIdQuery;
