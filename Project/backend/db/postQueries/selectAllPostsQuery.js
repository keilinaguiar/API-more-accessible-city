const getConnection = require('../getConnection');

const selectAllPostsQuery = async () => {
    let connection;
    try {
        connection = await getConnection();
        const [posts] = await connection.query(`
        SELECT P.id, P.title, P.descriptions, P.city, P.suburb, P.attended, P.image, P.createdAt FROM posts P
        `);
        return posts;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectAllPostsQuery;
