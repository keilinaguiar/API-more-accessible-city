const getConnection = require('../getConnection');

const selectPost = async (keyword) => {
    let connection;
    console.log(keyword);
    try {
        connection = await getConnection();
        const [posts] = await connection.query(
            `SELECT * FROM post WHERE city LIKE ? OR descriptions LIKE ?`,
            [`%${keyword}%`, `%${keyword}%`]
        );
        return posts;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectPost;
