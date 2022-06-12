const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateError } = require('../../helpers');
const { SECRET } = process.env;
const selectUserByEmail = require('../../db/adminQueries/selectAdminByEmailQuery');

const loginUser = async (req, res, next) => {
    try {
        // Obtenemos los campos del body.
        const { email, password } = req.body;

        // Si faltan campos lanzamos un error.
        if (!email || !password) {
            throw generateError('Faltan campos', 400);
        }

        // Obtenemos al administrador con el email del body.
        const admin = await selectUserByEmail(email);

        // Comprobamos si las contraseñas coinciden.
        const validPassword = await bcrypt.compare(password, admin.password);

        if (!validPassword) {
            await generateError('Contraseña incorrecta', 401);
        }

        // Información que queremos guardar en el token.
        const payload = {
            id: admin.id,
        };

        // Firmamos el token.
        const token = jwt.sign(payload, SECRET, {
            expiresIn: '10d',
        });

        res.send({
            status: 'ok',
            message: 'inicio sesión del administrador con éxito!',
            data: {
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};
module.exports = loginUser;
