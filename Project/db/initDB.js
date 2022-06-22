const getConnection = require('./getConnection');

async function main() {
    let connection;
    try {
        connection = await getConnection();

        console.log('Borrando tablas existentes...');

        await connection.query('DROP TABLE IF EXISTS posts');
        await connection.query('DROP TABLE IF EXISTS admin');

        console.log('Creando tablas...');

        await connection.query(`
            CREATE TABLE admin (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await connection.query(`
            CREATE TABLE posts (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                idAdmin INTEGER NOT NULL,
                FOREIGN KEY (idAdmin) REFERENCES admin(id),
                title VARCHAR(20) NOT NULL,
                descriptions VARCHAR(300) NOT NULL,
                city VARCHAR(20) NOT NULL,
                suburb VARCHAR(20) NOT NULL,
                attended BOOLEAN DEFAULT false,
                image VARCHAR(100),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        console.log('Tablas creadas');

        await connection.query(`
           INSERT INTO admin(email, password)
           VALUES ("admin@gmail.com", "123456")
           `);
        console.log('Usuario administrador creado');
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) connection.release();

        process.exit();
    }
}

main();
