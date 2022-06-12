const selectPostQuery = require('../../db/postQueries/selectPostQuery');

const getPost = async (req, res, next) => {
    try {
        const { keyword } = req.params;

        const post = await selectPostQuery(keyword);

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
module.exports = getPost;