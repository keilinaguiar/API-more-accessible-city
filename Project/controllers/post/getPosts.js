
const selectPosts = require('../../db/postQueries/selectPosts');

const getPosts = async (req, res, next) => {


    try {
        const { keyword } = req.query;

       const posts = await selectPosts(keyword);

        res.send(posts);
    } catch (error) {
        next(error);
    }
};

module.exports = getPosts;
