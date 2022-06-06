const getConnection = require('./getConnection');

async function main() {
    let connection;
    try {
        connection = await getConnection();

        console.log('Borrando tablas existentes...');

        await connection.query('DROP TABLE IF EXISTS like');
        await connection.query('DROP TABLE IF EXISTS post');
        await connection.query('DROP TABLE IF EXISTS admin');
        await connection.query('DROP TABLE IF EXISTS user');

        console.log('Creando tablas...');

        await connection.query(`
            CREATE TABLE admin (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                role ENUM("admin"),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await connection.query(`
            CREATE TABLE user (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) UNIQUE NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await connection.query(`
            CREATE TABLE post (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                idAdmin INTEGER NOT NULL,
                FOREIGN KEY (idAdmin) REFERENCES admin(id),
                title VARCHAR(20) NOT NULL,
                descriptions VARCHAR(300) NOT NULL,
                city VARCHAR(20) NOT NULL,
                suburb VARCHAR(20) NOT NULL,
                image VARCHAR(100),
                attended BOOLEAN DEFAULT false,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        await connection.query(`
            CREATE TABLE like(
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                idUsers INTEGER NOT NULL,
                FOREIGN KEY (idUsers) REFERENCES users(id),
                idPost INTEGER NOT NULL,
                likes BOOLEAN DEFAULT false,
                FOREIGN KEY (idPost) REFERENCES post(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Tablas creadas');
    } catch (err) {
        console.error(err);
    }finally{
        if (connection) connection.release();

        process.exit();
    }
}

main();
