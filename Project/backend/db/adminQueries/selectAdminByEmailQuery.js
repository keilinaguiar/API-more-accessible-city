const getConnection = require('../getConnection');
const { generateError } = require('../../helpers');

const selectUserByEmail = async (email) => {
    let connection;

    try {
        connection = await getConnection();

        // Obtenemos un array de admins que cumplan la condición establecida.
        const [admin] = await connection.query(
            `SELECT id, password FROM admin WHERE email = ?`,
            [email]
        );

        // Si el array de admins tiene algún admin quiere decir que el nombre
        // ya está vinculado a otro admin. Lanzamos un error.
        if (admin.length > 1) {
            throw generateError(
                'Ya existe un administrador con ese email en la base de datos',
                409
            );
        }
        return admin[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserByEmail;
