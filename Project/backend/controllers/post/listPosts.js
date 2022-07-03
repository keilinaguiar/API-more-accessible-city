const selectAllPostsQuery = require('../../db/postQueries/selectAllPostsQuery');

const listPosts = async (req, res, next) => {
    try {
        let posts;
        posts = await selectAllPostsQuery();

        res.send({
            status: 'ok',
            data: {
                posts,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = listPosts;
