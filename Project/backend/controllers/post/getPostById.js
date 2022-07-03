const selectPostByIdQuery = require('../../db/postQueries/selectPostByIdQuery');

const getPostById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const post = await selectPostByIdQuery(id);

        res.send({
            status: "ok",
            data: {
                post,
            },
        });
    } catch (error) {
        next(error);
    }
};
module.exports = getPostById;