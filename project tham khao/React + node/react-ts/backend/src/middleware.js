import jwt from "jsonwebtoken";

const secretKey = "tuancandongsang"; // Thay thế bằng khóa bí mật của bạn

// Middleware kiểm tra tính hợp lệ của mã token
export const checkTokenMiddleware = (req, res, next) => {
  // Kiểm tra xem mã token có tồn tại trong tiêu đề yêu cầu không
  const token = req.headers["authorization"];
  console.log("const token = req.1");
  if (!token) {
    console.log("const token = req.2");
    return res
      .status(401)
      .json({ message: "Không tìm thấy mã token trong tiêu đề yêu cầu" });
  }

  // Xác minh mã token
  jwt.verify(token, secretKey, (err, decoded) => {
    console.log("const token = req.3");
    if (err) {
      console.log("const token = req.4", res.message);
      return res.status(401).json({ message: "Mã token không hợp lệ" });
    }
    console.log("const token = req.5");
    // Mã token hợp lệ, giải mã thông tin và lưu trữ trong đối tượng yêu cầu để sử dụng trong các API sau này
    req.user = decoded;
    next();
  });
};
