import mysql from "mysql2/promise";
// import dotenv from "dotenv";
// dotenv.config();
// // create the connection to database

// console.log("Creating connection pool...", process.env.DB_HOST);

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "nodejsbasic",
  // password: 'password'
});

const newDatabaseName = "nodejsbasic";

async function createDatabaseAndTable() {
  try {
    // Tạo mới cơ sở dữ liệu
    console.log(0);
    const connection = await pool.getConnection();
    console.log(1);

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${newDatabaseName}`);
    console.log(2);
    // Sử dụng cơ sở dữ liệu mới tạo
    await connection.query(`USE ${newDatabaseName}`);
    console.log(3);
    // Tạo bảng ghi trong cơ sở dữ liệu
    const createTableQuery = `
                CREATE TABLE IF NOT EXISTS ${process.env.DB_TABLE_USERS} (
                  id INT AUTO_INCREMENT PRIMARY KEY,
                  firstName VARCHAR(255) NOT NULL,
                  lastName VARCHAR(255) NOT NULL,
                  email VARCHAR(255) NOT NULL,
                  address VARCHAR(255) NOT NULL
                )
              `;
    const createdescriptionTableQuery = `
              CREATE TABLE IF NOT EXISTS ${process.env.DB_TABLE_DESCRIPTION} (
                id INT AUTO_INCREMENT PRIMARY KEY,
                description VARCHAR(255) NOT NULL
              )
            `;
    const createAuthenTableQuery = `
            CREATE TABLE IF NOT EXISTS ${process.env.BD_TABLE_AUTHEN} (
              id INT AUTO_INCREMENT PRIMARY KEY,
              username VARCHAR(255) NOT NULL,
              password VARCHAR(255) NOT NULL,
              email VARCHAR(255) NOT NULL
            )
          `;
    await connection.query(createTableQuery);
    console.log("tạo xong createTableQuery");
    await connection.query(createdescriptionTableQuery);
    console.log("tạo xong createdescriptionTableQuery");
    await connection.query(createAuthenTableQuery);
    console.log("tao xong createAuthenTableQuery");
    console.log("Cơ sở dữ liệu và bảng ghi đã được tạo.");

    // Đóng kết nối
    connection.release();
  } catch (error) {
    console.error(
      "Đẫ tồn tại or Lỗi khi tạo cơ sở dữ liệu và bảng ghi:",
      error.message
    );
  } finally {
    // Đóng pool kết nối
    // pool.end();
  }
}

// Gọi hàm để tạo cơ sở dữ liệu và bảng ghi mới
createDatabaseAndTable();

export default pool;
