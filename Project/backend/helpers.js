const fs = require('fs/promises');

const generateError = (message, status) => {
    const error = new Error(message);
    error.statusCode = status;
    return error;
};
const createPath = async (path) =>{
    try {
        await fs.access(path);
    } catch {
        //si no es posible acceder al directorio en el "try", lo creamos
        await fs.mkdir(path);
    }
}

module.exports = {
    generateError, 
    createPath,
} 
