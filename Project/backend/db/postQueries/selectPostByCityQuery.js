const { generateError } = require('../../helpers');
const getConnection = require('../getConnection');

const selectPostByCity = async (city) => {
    let connection;

    try {
        connection = await getConnection();
        //creamos un array de post para poder verificar que no se publiquen el mismo problema de accesibilidad varias veces
        const [posts] = await connection.query(
            `SELECT P.id, P.title, P.descriptions, P.city, P.suburb, P.attended, P.image, P.createdAt FROM posts P WHERE city = ?`,
            [city]
        );

        if (posts.length <= 0) {
            throw generateError(
                'No hay problemas registrados en esa ciudad',
                403
            );
        }

        return posts;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectPostByCity;
