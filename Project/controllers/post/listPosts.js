const selectPostQuery = require('../../db/postQueries/selectPostQuery');
const selectAllPostsQuery = require('../../db/postQueries/selectAllPostsQuery');

const listPosts = async (req, res, next) => {
    try {
        let posts;
        const { keyword } = req.query;
        if (keyword) {
            posts = await selectPostQuery(keyword);
        }
       else{
        posts = await selectAllPostsQuery();
       } 

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
