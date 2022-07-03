const selectPostByCityQuery = require('../../db/postQueries/selectPostByCityQuery');

const getPostByCity = async (req, res, next) => {
    try {
        const { city } = req.params;

        const posts = await selectPostByCityQuery(city);

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
module.exports = getPostByCity;
