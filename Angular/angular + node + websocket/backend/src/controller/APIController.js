import pool from "../configs/connectDB";
const moment = require('moment'); // Import thư viện Moment.js

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
  try {
    const { user_id, room_id } = req.query;
    // console.log('room_id', room_id);

    // Kiểm tra xem người dùng có quyền truy cập vào phòng chat hay không
    // ...

    // Lấy toàn bộ tin nhắn của phòng chat từ database
    const messages = await pool.query(
      "SELECT * FROM Messages WHERE room_id = ? ORDER BY message_sent_at ASC",
      [room_id]
    ); 

        // Chuyển đổi dữ liệu thời gian sang dạng phút:giờ 'HH:mm'
        const allMessagesInRoom = messages[0].map(message => ({
          ...message,
          message_sent_at: moment(message.message_sent_at).format('HH:mm')
        }));

    // const allMessagesInRoom = messages[0];
    // console.log('messages', allMessagesInRoom);

      res.status(200).json({ allMessagesInRoom });
  } catch (error) {
    console.error("Lỗi khi lấy tin nhắn:", error);
    res.status(500).json({ message: "Lỗi khi lấy tin nhắn" });
  }
};

const postMessageInRoom = async (req, res) => {
  try {
    const { room_id, user_id, user_name, message_content, message_sent_at } =
      req.body;

    // Thực hiện INSERT vào bảng Messages
    await pool.query(
      `INSERT INTO Messages (room_id, user_id, user_name, message_content, message_sent_at) 
       VALUES (?, ?, ?, ?, ?)`,
      [room_id, user_id, user_name, message_content, message_sent_at]
    );

    // Trả về thông báo thành công nếu muốn
    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Error posting message:", error);
    res.status(500).json({ success: false, message: "Error posting message" });
  }
};

module.exports = {
  getAllRoomChat,
  getMessageInRoom,
  postMessageInRoom,
};
