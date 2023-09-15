import pool from "../configs/connectDB";
const moment = require("moment"); // Import thư viện Moment.js
import fs from "fs";
// import socketIoClient from "socket.io-client";

// const socket = socketIoClient("http://localhost:4200");

const getAllRoomChat = async (req, res) => {
  const { keyword, limit, pageNumber } = req.query;
  const startNumber = (pageNumber - 1) * limit;
  const limitNumber = limit * 1;
  let sqlQuery = `
  SELECT *
  FROM ChatRooms`;
  const queryParams = [];
  if (keyword) {
    sqlQuery += ` WHERE room_name LIKE ?`;
    queryParams.push(`%${keyword}%`);
  }
  sqlQuery += `
  ORDER BY room_name ASC`; // Sắp xếp theo thứ tự tăng dần (A-Z)
  if (limitNumber && pageNumber) {
    sqlQuery += `
      LIMIT ?, ?
    `;
    queryParams.push(startNumber, limitNumber); // Thêm giá trị của startNumber và limitNumber vào mảng queryParams
  }
  try {
    // Kiểm tra xem người dùng có quyền truy cập vào danh sách room hay không
    // ...

    // Lấy toàn bộ danh sách room từ database
    const [rows, fields] = await pool.execute(sqlQuery, queryParams);
    // Lấy tổng số phòng (dựa trên cùng điều kiện tìm kiếm)

    let totalItems = 0;

    if (keyword) {
      const [countRows] = await pool.execute(
        "SELECT COUNT(*) AS totalCount FROM ChatRooms WHERE room_name LIKE ?",
        [`%${keyword}%`]
      );
      totalItems = countRows[0].totalCount;
    } else {
      const [countRows] = await pool.execute(
        "SELECT COUNT(*) AS totalCount FROM ChatRooms"
      );
      totalItems = countRows[0].totalCount;
    }

    res.status(200).json({
      message: "ok",
      rooms: rows,
      totalItems: totalItems,
    });
  } catch (error) {
    console.error("Lỗi khi lấy tin nhắn:", error);
    res.status(500).json({ message: "Lỗi khi lấy tin nhắn" });
  }
};

const createOrSelectRoomChat = async (req, res) => {
  const {
    room_created_by_user_id,
    room_name_create,
    room_password,
    room_name_select,
    room_avatar,
  } = req.body;

  if (room_name_select) {
    const [roomCheck] = await pool.execute(
      "SELECT * FROM ChatRooms WHERE room_name = ?",
      [room_name_select]
    );
    if (roomCheck.length === 0) {
      return res.status(400).json({ message: "Phòng chat này không tồn tại" });
    }

    const roomInfo = roomCheck[0]; // Lấy thông tin phòng
    if (roomInfo.room_password && roomInfo.room_password !== room_password) {
      return res.status(400).json({ message: "Sai key đăng nhập room" });
    }
    res.json({
      message: "Join phòng thành công",
      roomInfo,
    });
  }

  if (room_name_create) {
    const [existingRoom] = await pool.execute(
      "SELECT * FROM ChatRooms WHERE room_name = ?",
      [room_name_create]
    );

    if (existingRoom.length > 0) {
      return res.status(400).json({ message: "Phòng chat đã tồn tại" });
    }

    // Tạo phòng mới và lấy ID của phòng
    await pool.execute(
      "INSERT INTO ChatRooms (room_name, room_password, room_created_by_user_id, room_avatar ) VALUES (?, ?, ?, ?)",
      [room_name_create, room_password, room_created_by_user_id, room_avatar]
    );
    const [roomCheck] = await pool.execute(
      "SELECT * FROM ChatRooms WHERE room_name = ?",
      [room_name_create]
    );
    if (roomCheck) {
      const roomInfo = roomCheck[0]; // Lấy thông tin phòng
      res.json({
        message: "Tạo phòng thành công",
        roomInfo,
      });
    }
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
    const [BinaryRow] = await pool.execute(
      `SELECT COUNT(*) as totalCount FROM Messages WHERE room_id = ?`,
      [room_id]
    );

    // Chuyển đổi dữ liệu thời gian sang dạng phút:giờ 'HH:mm'
    const allMessagesInRoom = messages[0].map((message) => ({
      ...message,
      message_sent_at: moment(message.message_sent_at).format(
        "DD/MM/YYYY : HH:mm:ss"
      ),
    }));
    // socket.emit("message");
    res.status(200).json({
      message: "ok",
      data: allMessagesInRoom,
      totalItems: BinaryRow[0]?.totalCount,
    });
  } catch (error) {
    console.error("Lỗi khi lấy tin nhắn:", error);
    res.status(500).json({ message: "Lỗi khi lấy tin nhắn" });
  }
};

const postMessageInRoom = async (req, res) => {
  const {
    room_id,
    user_id,
    user_name,
    message_content,
    message_sent_at,
    user_avatar,
  } = req.body;
  try {
    // Thực hiện INSERT vào bảng Messages
    const [result] = await pool.execute(
      `INSERT INTO Messages (room_id, user_id, user_name, message_content, message_sent_at, user_avatar) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        room_id,
        user_id,
        user_name,
        message_content,
        message_sent_at,
        user_avatar,
      ]
    );

    // socket.emit("message", user_id);

    // Lấy id của tin nhắn vừa được tạo
    const messageId = result.insertId;
    console.log("result.insertId;", result.insertId);

    // Truy vấn tin nhắn từ cơ sở dữ liệu để lấy thông tin đầy đủ
    const [messageRow] = await pool.query(
      `SELECT * FROM Messages WHERE message_id = ?`,
      [messageId]
    );

    if (messageRow.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }

    // Trả về thông báo thành công nếu muốn
    res.status(200).json({
      success: true,
      message: "Message sent successfully",
      oneNewMessageData: messageRow[0],
    });
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
      "SELECT * FROM Messages WHERE message_id = ?",
      [message_id]
    );

    if (message.length === 0) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Xóa tin nhắn từ bảng Messages
    await pool.query("DELETE FROM Messages WHERE message_id = ?", [message_id]);

    // Trả về thông tin tin nhắn đã xóa nếu cần
    // socket.emit("message", "tao laf dele tu serve");
    res.status(200).json({
      message: "Message deleted successfully",
      deletedMessage: message[0],
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Error deleting message" });
  }
};

const editMessageUserInRoom = async (req, res) => {
  const { message_content, message_id } = req.body;
  console.log("message_content, message_id", message_content, message_id);

  try {
    // Kiểm tra xem tin nhắn có tồn tại không
    const existingMessage = await pool.query(
      "SELECT * FROM Messages WHERE message_id = ?",
      [message_id]
    );

    if (existingMessage.length === 0) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Thực hiện truy vấn SQL để cập nhật message_content
    await pool.query(
      "UPDATE Messages SET message_content = ? WHERE message_id = ?",
      [message_content, message_id]
    );

    res.status(200).json({ message: "Message updated successfully" });
  } catch (error) {
    console.error("Error editing message:", error);
    res.status(500).json({ message: "Error editing message" });
  }
};

const deleteRoomAip = async (req, res) => {
  const { room_id } = req.query;
  try {
    // Lấy tên tệp ảnh room_avatar của phòng chat
    const [roomInfo] = await pool.query(
      "SELECT room_avatar FROM ChatRooms WHERE room_id = ?",
      [room_id]
    );

    // Kiểm tra xem có ảnh room_avatar hay không
    if (roomInfo && roomInfo[0] && roomInfo[0].room_avatar) {
      const roomAvatarPath = `./src/uploads/${roomInfo[0].room_avatar}`;
      const cleanedPath = roomAvatarPath.replace('/http://localhost:9288/uploads', '');

      // Xóa tệp ảnh khỏi thư mục uploads
      fs.unlinkSync(cleanedPath);
    }

    // Xóa tất cả các tin nhắn thuộc phòng chat này
    await pool.query("DELETE FROM Messages WHERE room_id = ?", [room_id]);

    // Sau đó, xóa phòng chat
    await pool.query("DELETE FROM ChatRooms WHERE room_id = ?", [room_id]);

    res
      .status(200)
      .json({ message: "Phòng chat và tin nhắn đã được xóa thành công" });
  } catch (error) {
    console.error("Error deleting chatrooms:", error);
    res.status(500).json({ message: "Lỗi khi xóa phòng chat và tin nhắn" });
  }
};

module.exports = {
  createOrSelectRoomChat,
  getAllRoomChat,
  getMessageInRoom,
  postMessageInRoom,
  deleteMessageUserInRoom,
  editMessageUserInRoom,
  deleteRoomAip,
};
