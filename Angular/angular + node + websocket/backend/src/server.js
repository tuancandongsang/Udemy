import express from "express";
import cors from "cors";
import initAPIRoute from "./route/api";
import http from "http"; // Thêm thư viện http
import socketIo from "socket.io"; // Thêm thư viện socket.io

require("dotenv").config();
var morgan = require("morgan");

const app = express();

const server = http.createServer(app); // Tạo server HTTP

const io = socketIo(server);

const port = process.env.PORT || 9288;
app.use(
  cors({
    origin: "http://localhost:4200", // Địa chỉ ứng dụng Angular của bạn
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true, // Cho phép truy cập cookies khi sử dụng CORS
    optionsSuccessStatus: 200, // Cho phép các trạng thái thành công khác nhau (200, 201, ...)
  })
);

app.use((req, res, next) => {
  // console.log(">>> run into my middleware");
  console.log(req.method);
  next();
});

app.use(morgan("combined"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

io.on("connection", (socket) => {
  console.log("connected OK");

  // Lắng nghe sự kiện từ client và gửi lại cho tất cả client khác
  socket.on("message", (message) => {
    io.emit("message", message);
  });
  socket.on("edit", (message) => {
    io.emit("edit", message);
  });
  socket.on("delete", (message) => {
    io.emit("delete", message);
  });

  // Xử lý sự kiện disconnect
  socket.on("disconnect", () => {
    console.log(" disconnected OK");
  });
});

// init api route
initAPIRoute(app);

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
