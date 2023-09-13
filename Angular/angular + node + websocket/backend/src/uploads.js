import multer from "multer";
const fs = require('fs');
// Đảm bảo rằng thư mục lưu trữ tồn tại
const storageDir = './src/uploads'; // Đường dẫn đến thư mục lưu trữ
if (!fs.existsSync(storageDir)) {
  fs.mkdirSync(storageDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, storageDir); // Đường dẫn đến thư mục lưu trữ
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'avatar-' + uniqueSuffix + '.jpg'); // Đổi tên tệp ảnh sau khi tải lên
  },
});

const upload = multer({ storage: storage });

const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('Không có tệp ảnh được tải lên.');
    }
    
    const imagePath = req.file.filename; // Lấy tên tệp ảnh sau khi tải lên
    return res.status(200).json({ message: 'Tệp ảnh đã tải lên thành công', imagePath });
  } catch (error) {
    console.error('Lỗi khi tải lên ảnh:', error);
    res.status(500).json({ message: 'Lỗi khi tải lên ảnh' });
  }
};

export { uploadAvatar, upload };
