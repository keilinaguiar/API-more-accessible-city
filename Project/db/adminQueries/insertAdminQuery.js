const getConnection = require("../getConnection");

const bcrypt = require('bcrypt');

const { generateError } = require('../../helpers');

const insertAdminQuery = async (email, password) => {
    let connection;

    try {
        connection = await getConnection();

        // Obtenemos un array de admin que cumplan la condición establecida.
        const [admin] = await connection.query(
            `SELECT id, password FROM admin WHERE email = ?`,
            [email]
        );

        // Si el array de admin tiene algún admin quiere decir que el email
        // ya está vinculado a otro usuario. Lanzamos un error.
        if (admin.length > 0) {
            throw generateError(
                'Ya existe un admin con ese email en la base de datos',
                409
            );
        }

        // Encriptamos la contraseña.
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creamos el admin.
        const [newAdmin] = await connection.query(
            `INSERT INTO admin (email, password) VALUES(?, ?)`,
            [email, hashedPassword]
        );

        // Retornamos el id del elemento creado.
        return newAdmin.insertId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertAdminQuery;
