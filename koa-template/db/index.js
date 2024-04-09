const mysql = require("mysql")
const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'gis',
    dateStrings: true, //解决时间格式
})
const sql_exec = (sql, val) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, con) => {
            if (err) {
                reject(err)
                console.log("数据库连接失败")
            } else {
                console.log("建立连接")
                con.query(sql, val, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                        con.release();
                    }
                })
            }
        })

    })
}
module.exports = {
    sql_exec
}