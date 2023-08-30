import pool from "../configs/connectDB";
const moment = require("moment"); // Import thư viện Moment.js
import socketIoClient from "socket.io-client";

const socket = socketIoClient("http://localhost:4200");

const getAllRoomChat = async (req, res) => {
  try {
    const [results] = await pool.execute("SELECT * FROM ChatRooms");

    // Trả về danh sách các phòng
    res.json({ rooms: results });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách các phòng:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách các phòng" });
  }
};

const getMessageInRoom = async (req, res) => {
  const { user_id, room_id, keyword, limit, pageNumber } = req.query;
  const startNumber = (pageNumber - 1) * limit;
  const limitNumber = limit * 1;

  let sqlQuery = `
  SELECT *
  FROM Messages
  WHERE room_id = ? `;
  const queryParams = [room_id];

  if (keyword) {
    sqlQuery += `AND messages.message_content LIKE ?`;
    queryParams.push(`%${keyword}%`);
  }

  sqlQuery += `ORDER BY message_sent_at DESC `;

  if (limitNumber && pageNumber) {
    sqlQuery += `LIMIT ?, ? `;
    queryParams.push(startNumber, limitNumber);
  }

  try {
    // Kiểm tra xem người dùng có quyền truy cập vào phòng chat hay không
    // ...

    // Lấy toàn bộ tin nhắn của phòng chat từ database
    const messages = await pool.query(
      sqlQuery,
      queryParams
      // "SELECT * FROM Messages WHERE room_id = ? ORDER BY message_sent_at ASC",
      // [room_id]
    );

    // Chuyển đổi dữ liệu thời gian sang dạng phút:giờ 'HH:mm'
    const allMessagesInRoom = messages[0].map((message) => ({
      ...message,
      message_sent_at: moment(message.message_sent_at).format("HH:mm"),
    }));

    res.status(200).json({ allMessagesInRoom });
  } catch (error) {
    console.error("Lỗi khi lấy tin nhắn:", error);
    res.status(500).json({ message: "Lỗi khi lấy tin nhắn" });
  }
};

const postMessageInRoom = async (req, res) => {
  const { room_id, user_id, user_name, message_content, message_sent_at } =
    req.body;
  try {
    // Thực hiện INSERT vào bảng Messages
    await pool.query(
      `INSERT INTO Messages (room_id, user_id, user_name, message_content, message_sent_at) 
       VALUES (?, ?, ?, ?, ?)`,
      [room_id, user_id, user_name, message_content, message_sent_at]
    );

    socket.emit("message", message_content);

    // Trả về thông báo thành công nếu muốn
    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Error posting message:", error);
    res.status(500).json({ success: false, message: "Error posting message" });
  }
};


const deleteMessageUserInRoom = async (req, res) => {
  const { message_id } = req.query;

  try {
    // Kiểm tra thông tin quyền truy cập của người dùng và tồn tại của tin nhắn
    const message = await pool.query(
      'SELECT * FROM Messages WHERE message_id = ?',
      [message_id]
    );

    if (message.length === 0) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Xóa tin nhắn từ bảng Messages
    await pool.query('DELETE FROM Messages WHERE message_id = ?', [message_id]);

    // Trả về thông tin tin nhắn đã xóa nếu cần
    socket.emit("message");
    res.status(200).json({
      message: 'Message deleted successfully',
      deletedMessage: message[0],
    });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ message: 'Error deleting message' });
  }
};


module.exports = {
  getAllRoomChat,
  getMessageInRoom,
  postMessageInRoom,
  deleteMessageUserInRoom,
};
