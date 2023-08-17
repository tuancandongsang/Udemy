import pool from "../configs/connectDB";
import { promisify } from "util";
import jwtRefreshToken from "jsonwebtoken-refresh";
import moment from "moment";
import jwt from "jsonwebtoken";

const jwtSign = promisify(jwt.sign);
const secretKey = "tuancandongsang"; // Thay thế bằng khóa bí mật của bạn
const refreshSecretKey = "tuancandongsang"; // Thay thế bằng khóa bí mật cho refresh token của bạn

let login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [results] = await pool.execute(
      "SELECT * FROM authen WHERE username = ? AND password = ?",
      [username, password]
    );

    if (results.length > 0) {
      const user = results[0];
      const tokenExpiryTime = 6*1000; // Thời gian hết hạn mã token ms
      const refreshTokenExpiryTime = 1000*60*1000; // Thời gian hết hạn refresh token ms

      // Tạo mã token với thời gian hết hạn
      const token = await jwtSign(
        { id: user.id, email: user.email },
        secretKey,
        { expiresIn: `${tokenExpiryTime}` }
      );

      // Tạo refresh token với thời gian hết hạn
      const refreshToken = await jwtRefreshToken.sign(
        { id: user.id, email: user.email },
        refreshSecretKey,
        moment().add(refreshTokenExpiryTime).unix() // Thời gian hết hạn được tính theo Unix timestamp
      );

      res.json({ id: user.id,  message: "Đăng nhập thành công", token, refreshToken });
    } else {
      res.status(401).json({ message: "Thông tin đăng nhập không hợp lệ" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi đăng nhập" });
  }
};
let register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // const connection = await mysql.createConnection(dbConfig);
    await pool.execute(
      "insert into authen (username, password, email) values (?, ?, ?)",
      [username, password, email]
    );
    return res.json({ message: "Đăng ký thành công" });
  } catch (err) {
    console.error("Lỗi đăng ký người dùng:", err);
    res.status(500).json({ message: "Lỗi đăng ký người dùng" });
  }
};

let refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  jwtRefreshToken.verify(
    refreshToken,
    refreshSecretKey,
    async (err, decoded) => {
      if (err) {
        // Refresh token không hợp lệ
        res.status(401).json({ message: "Refresh token không hợp lệ" });
      } else {
        try {
          // Tạo mã token mới với thời gian hết hạn
          const tokenExpiryTime = 6*1000; // Thời gian hết hạn mã token (1 giờ)
          const newToken = jwt.sign({ email: decoded.email }, secretKey, {
            expiresIn: tokenExpiryTime,
          });

          // Tạo refresh token mới với thời gian hết hạn
          const refreshTokenExpiryTime = 100*60*1000; // Thời gian hết hạn refresh token (7 ngày)
          const newRefreshToken = await jwtRefreshToken.sign(
            { email: decoded.email },
            refreshSecretKey,
            moment().add(refreshTokenExpiryTime).unix() // Thời gian hết hạn được tính theo Unix timestamp
          );
          res.json({ token: newToken, refreshToken: newRefreshToken });
        } catch (error) {
          console.error("Lỗi khi tạo mã token mới:", error);
          res.status(500).json({ message: "Lỗi khi tạo mã token mới" });
        }
      }
    }
  );
};

module.exports = {
  login,
  register,
  refreshToken,
};
