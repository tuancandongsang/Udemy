import pool from "../configs/connectDB";
import { promisify } from "util";
// import jwtRefreshToken from "jsonwebtoken-refresh";
// import moment from "moment";
import jwt from "jsonwebtoken";
import {upload} from "../uploads"

const jwtSign = promisify(jwt.sign);
const secretKey = "tuancandongsang"; // Thay thế bằng khóa bí mật của bạn
const refreshSecretKey = "tuancandongsang"; // Thay thế bằng khóa bí mật cho refresh token của bạn

const login = async (req, res) => {
  const { username, password, roomName, createRoomName } = req.body;
  try {
    const [results] = await pool.execute(
      "SELECT * FROM Users WHERE user_name  = ? AND user_password  = ?",
      [username, password]
    );

    if (results.length > 0) {
      let chatrooms = {};

      if (roomName) {
        const [roomCheck] = await pool.execute(
          "SELECT * FROM ChatRooms WHERE room_name = ?",
          [roomName]
        );
        if (roomCheck.length === 0) {
          return res
            .status(400)
            .json({ message: "Phòng chat này không tồn tại" });
        }

        const roomInfo = roomCheck[0]; // Lấy thông tin phòng
        const { room_id, room_created_by_user_id } = roomInfo;

        chatrooms = {
          room_name: roomName,
          room_id,
          room_created_by_user_id,
        };
      }
      // Kiểm tra xem người dùng muốn tạo phòng mới
      if (createRoomName) {
        const [existingRoom] = await pool.execute(
          "SELECT * FROM ChatRooms WHERE room_name = ?",
          [createRoomName]
        );

        if (existingRoom.length > 0) {
          return res.status(400).json({ message: "Phòng chat đã tồn tại" });
        }

        const user = results[0];
        // Tạo phòng mới và lấy ID của phòng
        await pool.execute(
          "INSERT INTO ChatRooms (room_name, room_created_by_user_id ) VALUES (?, ?)",
          [createRoomName, user.user_id]
        );
        const [roomCheck] = await pool.execute(
          "SELECT * FROM ChatRooms WHERE room_name = ?",
          [createRoomName]
        );

        const roomInfo = roomCheck[0]; // Lấy thông tin phòng
        const { room_id, room_created_by_user_id } = roomInfo;

        chatrooms = {
          room_name: createRoomName,
          room_id,
          room_created_by_user_id,
        };
      }

      const user = results[0];
      const tokenExpiryTime = 10 * 60 * 60; // Thời gian hết hạn mã token (đơn vị: giây)

      // Tạo mã token với thời gian hết hạn
      const token = jwt.sign(
        { id: user.user_id, email: user.user_email },
        secretKey,
        { expiresIn: tokenExpiryTime }
      );
      // Tạo refreshToken (giả sử bạn sử dụng thư viện jsonwebtoken)
      const refreshToken = jwt.sign(
        { id: user.user_id, email: user.user_email },
        refreshSecretKey,
        { expiresIn: "7d" } // Ví dụ: hết hạn sau 7 ngày
      );

      res.json({
        user: {
          user_id: user.user_id,
          user_name: user.user_name,
          user_email: user.user_email,
          user_avatar: user.user_avatar,
        },
        message: "Đăng nhập thành công",
        token,
        refreshToken,
        chatrooms,
      });
    } else {
      res.status(401).json({ message: "Thông tin đăng nhập không hợp lệ" });
    }
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    res.status(500).json({ message: "Lỗi đăng nhập" });
  }
};

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Kiểm tra xem email hoặc tên đăng nhập đã tồn tại chưa
    const [emailCheck] = await pool.execute(
      "SELECT * FROM Users WHERE user_email  = ?",
      [email]
    );

    const [usernameCheck] = await pool.execute(
      "SELECT * FROM Users WHERE user_name  = ?",
      [username]
    );

    if (usernameCheck.length > 0) {
      return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });
    }

    if (emailCheck.length > 0) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    // Nếu email và tên đăng nhập không trùng, thực hiện đăng ký
    await pool.execute(
      "INSERT INTO Users (user_name, user_password, user_email) VALUES (?, ?, ?)",
      [username, password, email]
    );

    return res.json({ message: "Đăng ký thành công" });
  } catch (err) {
    console.error("Lỗi đăng ký người dùng:", err);
    res.status(500).json({ message: "Lỗi đăng ký người dùng" });
  }
};

// const uploadAvatar = async (req, res) => {
//   // const {file} = req
//   console.log('req.file', req.file);
//   if (!req.file) {
//     return res.status(400).send('Không có tệp ảnh được tải lên.');
//   }
//   const imagePath = req.file.path; // Đường dẫn đến tệp ảnh đã tải lên
//   return res.send('Tệp ảnh đã tải lên thành công: ' + imagePath);
// }

const refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  jwt.verify(refreshToken, refreshSecretKey, (err, decoded) => {
    if (err) {
      // Refresh token không hợp lệ
      res.status(401).json({ message: "Refresh token không hợp lệ" });
    } else {
      try {
        // Tạo mã token mới với thời gian hết hạn
        const tokenExpiryTime = 6 * 60 * 60; // Thời gian hết hạn mã token (đơn vị: giây)
        const newToken = jwt.sign(
          { id: decoded.user_id, email: decoded.user_email },
          secretKey,
          {
            expiresIn: tokenExpiryTime,
          }
        );

        // Tạo refresh token mới với thời gian hết hạn
        const refreshTokenExpiryTime = 30 * 24 * 60 * 60; // Thời gian hết hạn refresh token (đơn vị: giây)
        const newRefreshToken = jwt.sign(
          { id: decoded.user_id, email: decoded.user_email },
          refreshSecretKey,
          {
            expiresIn: refreshTokenExpiryTime,
          }
        );

        res.json({ token: newToken, refreshToken: newRefreshToken });
      } catch (error) {
        console.error("Lỗi khi tạo mã token mới:", error);
        res.status(500).json({ message: "Lỗi khi tạo mã token mới" });
      }
    }
  });
};

module.exports = {
  login,
  register,
  refreshToken,
  // uploadAvatar
};
