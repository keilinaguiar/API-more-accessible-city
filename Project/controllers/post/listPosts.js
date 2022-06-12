
const selectAllPostsQuery = require('../../db/postQueries/selectAllPostsQuery');

const listPosts = async (req, res, next) => {
    try {

        const posts = await selectAllPostsQuery();

        res.send({
            status: "ok",
            data: {
                posts,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = listPosts;
