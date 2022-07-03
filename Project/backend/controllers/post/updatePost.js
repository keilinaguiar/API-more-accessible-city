const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');
const { generateError, createPath } = require('../../helpers');
const editPost = require('../../db/postQueries/editPostQuery');

const updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, idAdmin, descriptions, city, suburb, attended } =
            req.body;

        if (
            !title ||
            !idAdmin ||
            !descriptions ||
            !city ||
            !suburb ||
            !attended
        ) {
            throw generateError('Faltan campos', 400);
        }

        //Variable donde se almacenara el nombre con el que guardaremos la imagen en el disco
        let imageName;

        //si envian un post con imagen la guardamos
        if (req.files && req.files.image) {
            const uploadsDir = path.join(__dirname, '..', '..', 'uploads');

            await createPath(uploadsDir);

            //procesamos la imagen  y convertimos en tipo "sharp"
            const sharpImage = sharp(req.files.image.data);

            //redimencionamos la imagen en px
            sharpImage.resize(500);

            //Generamos un nombre unico en el directorio uploads
            imageName = `${nanoid(24)}.jpg`;

            //generamos la ruta absoluta a la imagen
            const imagePath = path.join(uploadsDir, imageName);

            await sharpImage.toFile(imagePath);
        }

        editPost(
            title,
            idAdmin,
            descriptions,
            city,
            suburb,
            imageName,
            attended,
            id
        );

        res.send({
            status: 'Ok',
            message: 'Post editado',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updatePost;
