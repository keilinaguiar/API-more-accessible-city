const generateError = require('../../helpers');
const insertPost = require('../../db/postQueries/insertPostQuery');

const newPost = async (req, res, next) => {
    try {
        const { title, idAdmin,  descriptions, city, suburb, attended } = req.body;

        if (!title || !idAdmin || !descriptions || !city || !suburb) {
            throw generateError('Faltan campos', 400);
        }
        //if (req.files && req.files.image) {
            
       // }
        await insertPost(title, idAdmin, descriptions, city, suburb, attended);

        res.send({
            status: 'Ok',
            message: 'Post creado',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = newPost;
