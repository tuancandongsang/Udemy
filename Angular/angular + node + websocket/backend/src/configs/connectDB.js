import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "roomchatwebsocket",
  // password: 'password'
});

const databaseName = "roomchatwebsocket";

async function createDatabaseAndTable() {
  try {
    // Tạo mới cơ sở dữ liệu
    const connectionConfig = {
      host: "localhost",
      user: "root",
      // password: 'your_password'
    };
    console.log(" bắt đầu tạo ");
    const connection = await mysql.createConnection(connectionConfig);
    console.log("createConnection");

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);
    console.log("CREATE DATABASE IF NOT EXISTS databaseName");
    // Sử dụng cơ sở dữ liệu mới tạo
    await connection.query(`USE ${databaseName}`);
    console.log("query(`USE ${databaseName}`");
    // Tạo bảng ghi trong cơ sở dữ liệu
    const Users = `
                CREATE TABLE IF NOT EXISTS Users  (
                  user_id INT PRIMARY KEY AUTO_INCREMENT,
                  user_name VARCHAR(255) NOT NULL,
                  user_password VARCHAR(255) NOT NULL,
                  user_email VARCHAR(255) NOT NULL,
                  user_avatar VARCHAR(255)
                )
              `;
    await connection.query(Users);
    console.log("create table Users");

    const ChatRooms = `
            CREATE TABLE IF NOT EXISTS ChatRooms  (
              room_id INT PRIMARY KEY AUTO_INCREMENT,
              room_name VARCHAR(255) NOT NULL,
              room_created_by_user_id INT,
              FOREIGN KEY (room_created_by_user_id) REFERENCES Users(user_id)
            )
          `;
    await connection.query(ChatRooms);
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
    await connection.query(UserChatRooms);
    console.log("create table UserChatRooms");

    const Messages = `
        CREATE TABLE IF NOT EXISTS Messages   (
          message_id INT PRIMARY KEY AUTO_INCREMENT,
          room_id INT,
          user_id INT,
          message_content TEXT,
          message_sent_at DATETIME,
          user_name VARCHAR(255),
          FOREIGN KEY (room_id) REFERENCES ChatRooms(room_id),
          FOREIGN KEY (user_id) REFERENCES Users(user_id)
        )
      `;
    await connection.query(Messages);
    console.log("create table Messages");
    console.log("DONE create");

    // Đóng kết nối
    // connection.release();
  } catch (error) {
    console.error(
      "Đẫ tồn tại or Lỗi khi tạo cơ sở dữ liệu và bảng ghi:",
      error.message
    );
  } finally {
  }
}

// Gọi hàm để tạo cơ sở dữ liệu và bảng ghi mới
async function checkDatabaseExists() {
  try {
    // Lấy kết nối từ pool
    const connection = await pool.getConnection();

    // Kiểm tra xem cơ sở dữ liệu "your_database_name" có tồn tại hay không
    const [rows, fields] = await connection.query(
      `SHOW DATABASES LIKE '${databaseName}'`
    );

    // Giải phóng kết nối
    connection.release();

    // Nếu rows có phần tử thì cơ sở dữ liệu tồn tại, ngược lại không tồn tại
    if (rows.length === 0) {
      console.log(`Cơ sở dữ liệu ${databaseName} chưa tồn tại.`);
    } else {
      console.log(`Cơ sở dữ liệu ${databaseName} đã tồn tại.`);
    }
  } catch (error) {
    if (error.errno === 1049) {
      await createDatabaseAndTable();
    }
  }
}

// Gọi hàm để kiểm tra cơ sở dữ liệu "databaseName"
checkDatabaseExists();

export default pool;
