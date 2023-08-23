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

const databaseName = "roomchat-websocket";

const newDatabaseName = "roomchatwebsocket";

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
                CREATE TABLE IF NOT EXISTS ${process.env.DB_TABLE_ROOMCHAT} (
                  id INT AUTO_INCREMENT PRIMARY KEY,
                  textchat VARCHAR(255) NOT NULL,
                  roomid VARCHAR(255) NOT NULL,
                  roomname VARCHAR(255) NOT NULL,
                  timesendmessage VARCHAR(255) NOT NULL,
                  username VARCHAR(255) NOT NULL,
                  userid VARCHAR(255) NOT NULL
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
async function checkDatabaseExists() {
  try {
    // Kết nối đến MySQL để kiểm tra cơ sở dữ liệu
    // const pool = mysql.createPool({
    //     host: "localhost",
    //     user: "root",
    //   //   database: "your_database_name", // đặt tên DB muốn tạo
    //     // password: 'password'
    //   });

    // Lấy kết nối từ pool
    const connection = await pool.getConnection();

    // Kiểm tra xem cơ sở dữ liệu "your_database_name" có tồn tại hay không
    const [rows, fields] = await connection.query(
      `SHOW DATABASES LIKE '${databaseName}'`
    );

    // Giải phóng kết nối
    connection.release();

    // Nếu rows có phần tử thì cơ sở dữ liệu tồn tại, ngược lại không tồn tại
    const databaseExists = rows.length > 0;
    console.log(`Cơ sở dữ liệu "nodejsbasic" tồn tại: ${databaseExists}`);
    if (databaseExists)
      return (pool = mysql.createPool({
        host: "localhost",
        user: "root",
        database: databaseName, // đặt tên DB muốn tạo
        // password: 'password'
      }));
    if (!databaseExists) {
      createDatabaseAndTable();
    }
    return databaseExists;
  } catch (error) {
    console.error("Lỗi khi kiểm tra cơ sở dữ liệu:", error.message);
    return false;
  }
}

// Gọi hàm để kiểm tra cơ sở dữ liệu "your_database_name"
checkDatabaseExists();

export default pool;
