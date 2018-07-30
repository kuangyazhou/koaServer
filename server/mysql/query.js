const mysql = require("mysql");

const config = {
    // port: 3000,
    // 数据库配置
    database: {
        DATABASE: "admin",
        USERNAME: "root",
        PASSWORD: "12345678",
        PORT: "3306",
        HOST: "localhost"
    }
};

const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    port: config.database.PORT
});

const query = (sql, param) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                throw err;
            } else {
                connection.query(sql, param, (err, rows) => {
                    if (err) {
                        reject(err);
                        throw err;
                    } else {
                        resolve(rows);
                    }
                    connection.release();
                });
            }
        });
    });
};

exports.getUser = () => {
    const user = `SELECT * from data`;
    return query(user);
};

exports.setUser = () => {
    const sql = `INSERT INTO data (name,des,age,level) VALUES (1,2,3,4)`;
    return query(sql);
};

exports.del = () => {
    const del = `DELETE from data WHERE name=1`;
    return query(del);
};
