import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "roomchatwebsocket",
  // password: 'password'
});
// let pool = null; // Khai báo biến pool

const databaseName = "roomchatwebsocket";
const newDatabaseName = "roomchatwebsocket";

async function createDatabaseAndTable(connection) {
  try {
    // Tạo mới cơ sở dữ liệu
    console.log("bắt đầu tạo ");
    const conn = connection || (await pool.getConnection()); // Sử dụng connection nếu được truyền vào
    console.log("getConnection");

    await conn.query(`CREATE DATABASE IF NOT EXISTS ${newDatabaseName}`);
    console.log("CREATE DATABASE IF NOT EXISTS");

    // Sử dụng cơ sở dữ liệu mới tạo
    await conn.query(`USE ${newDatabaseName}`);
    console.log("query(`USE ${newDatabaseName}`");

    // Tạo bảng ghi trong cơ sở dữ liệu
    const Users = `
                CREATE TABLE IF NOT EXISTS Users  (
                  user_id INT PRIMARY KEY AUTO_INCREMENT,
                  username VARCHAR(255) NOT NULL,
                  password VARCHAR(255) NOT NULL,
                  email VARCHAR(255) NOT NULL,
                  avatar VARCHAR(255)
                )
              `;
    await conn.query(Users);
    console.log("create table Users");

    const ChatRooms = `
            CREATE TABLE IF NOT EXISTS ChatRooms  (
              room_id INT PRIMARY KEY AUTO_INCREMENT,
              room_name VARCHAR(255) NOT NULL,
              created_by INT,
              FOREIGN KEY (created_by) REFERENCES Users(user_id)
            )
          `;
    await conn.query(ChatRooms);
    console.log("create table ChatRooms");

    const UserChatRooms = `
          CREATE TABLE IF NOT EXISTS UserChatRooms  (
            user_id INT,
            room_id INT,
            joined_at DATETIME,
            PRIMARY KEY (user_id, room_id),
            FOREIGN KEY (user_id) REFERENCES Users(user_id),
            FOREIGN KEY (room_id) REFERENCES ChatRooms(room_id)
          )
        `;
    await conn.query(UserChatRooms);
    console.log("create table UserChatRooms");

    const Messages = `
        CREATE TABLE IF NOT EXISTS Messages   (
          message_id INT PRIMARY KEY AUTO_INCREMENT,
          room_id INT,
          user_id INT,
          content TEXT,
          sent_at DATETIME,
          FOREIGN KEY (room_id) REFERENCES ChatRooms(room_id),
          FOREIGN KEY (user_id) REFERENCES Users(user_id)
        )
      `;
    await conn.query(Messages);
    console.log("create table Messages");
    console.log("Done create DATABASE and TABLE");

    // Đóng kết nối
    if (!connection) {
      conn.release();
      return (pool = mysql.createPool({
        host: "localhost",
        user: "root",
        database: newDatabaseName,
        // password: 'password'
      }));
    }
  } catch (error) {
    console.error("Lỗi khi tạo cơ sở dữ liệu và bảng ghi:", error.message);
  } finally {
    // Đóng pool kết nối
    // pool.end();
  }
}

// Gọi hàm để tạo cơ sở dữ liệu và bảng ghi mới
async function initializeDatabase() {
  try {
    // Lấy kết nối từ pool
    const connection = await pool.getConnection();

    // Kiểm tra xem cơ sở dữ liệu "your_database_name" có tồn tại hay không
    const [rows, fields] = await connection.query(
      `SHOW DATABASES LIKE '${databaseName}'`
    );

    // Giải phóng kết nối

    // Nếu rows có phần tử thì cơ sở dữ liệu tồn tại, ngược lại không tồn tại
    if (rows.length === 0) {
      console.log(`Cơ sở dữ liệu ${newDatabaseName} chưa tồn tại.`);
      await createDatabaseAndTable(connection);
    } else {
      console.log(`Cơ sở dữ liệu ${newDatabaseName} đã tồn tại.`);
    }

    connection.release();
    return pool
    // return (pool = mysql.createPool({
    //   host: "localhost",
    //   user: "root",
    //   database: newDatabaseName,
    //   // password: 'password'
    // }));
    // console.log(` ${newDatabaseName} đã tồn tại.`, pool);
  } catch (error) {
    console.error("Lỗi khi kiểm tra cơ sở dữ liệu:", error.message);
    return false;
  }
}

// Gọi hàm để kiểm tra cơ sở dữ liệu "your_database_name"
initializeDatabase();
// console.log(` đã tồn tại.`, pool);
export default pool;
