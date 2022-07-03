const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');
const { generateError, createPath } = require('../../helpers');
const insertPost = require('../../db/postQueries/insertPostQuery');

const newPost = async (req, res, next) => {
    try {
        const { title, idAdmin, descriptions, city, suburb } = req.body;

        console.log(req.body);

        if (!title || !idAdmin || !descriptions || !city || !suburb) {
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

        insertPost(title, idAdmin, descriptions, city, suburb, imageName);

        res.send({
            status: 'Ok',
            message: 'Post creado',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = newPost;
