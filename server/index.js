const express = require("express");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const multer = require("multer");

const app = express();
const port = 8888;

// Định nghĩa thư mục lưu ảnh
const imagePath = path.join(__dirname);

// Cấu hình multer để xử lý tải lên file
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());

// Định tuyến xử lý POST để tải lên ảnh
// app.post("/", upload.single("image"), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "No image uploaded" });
//   }

//   const imageBuffer = req.file.buffer;
//   const fileName = req.file.originalname;
//   const fileExtension = path.extname(fileName);
//   const baseFilename = path.basename(fileName, fileExtension);

//   // Lưu ảnh gốc
//   const originalPath = path.join(imagePath, `${baseFilename}${fileExtension}`);
//   fs.writeFileSync(originalPath, imageBuffer);

//   // Tạo và lưu ảnh thumbnail
//   const thumbnailBuffer = await sharp(imageBuffer)
//     .blur(1)
//     .resize(10) // Thay đổi kích thước nhỏ hơn để tạo thumbnail
//     .toBuffer();

//   const thumbnailPath = path.join(
//     imagePath,
//     `${baseFilename}_thumbnail${fileExtension}`
//   );
//   fs.writeFileSync(thumbnailPath, thumbnailBuffer);

//   // Gửi phản hồi thành công
//   res.status(200).send("OK");
// });

app.post("/", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  const imageBuffer = req.file.buffer;
  const fileName = req.file.originalname;
  const fileExtension = path.extname(fileName);
  const baseFilename = path.basename(fileName, fileExtension);

  // Lưu ảnh gốc dưới dạng WebP
  const originalPath = path.join(imagePath, `${baseFilename}.webp`);
  const originalWebPBuffer = await sharp(imageBuffer).webp().toBuffer();
  fs.writeFileSync(originalPath, originalWebPBuffer);

  // Tạo và lưu ảnh thumbnail dưới dạng WebP
  const thumbnailBuffer = await sharp(imageBuffer)
    .blur(1)
    .resize(10) // Thay đổi kích thước nhỏ hơn để tạo thumbnail
    .webp() // Chuyển đổi thành định dạng WebP
    .toBuffer();

  const thumbnailPath = path.join(imagePath, `${baseFilename}_thumbnail.webp`);
  fs.writeFileSync(thumbnailPath, thumbnailBuffer);

  // Gửi phản hồi thành công
  res.status(200).send("OK");
});

app.get("/:src", async (req, res) => {
  const { src } = req.params;
  const width = req.query.w ? Number(req.query.w) : undefined;
  const quality = req.query.q ? Number(req.query.q) : 75; // Default quality is 75 if not provided
  const thumbnail = req.query.thumbnail;

  console.log("Requested image:", src);
  console.log("Width:", width, "Quality:", quality, "Thumbnail:", thumbnail);

  const basename = path.basename(src, path.extname(src)); // Lấy tên file không có phần mở rộng

  if (thumbnail) {
    // Tạo đường dẫn thumbnail
    const thumbnailPath = path.join(__dirname, `${basename}_thumbnail.webp`);

    // Kiểm tra nếu file thumbnail tồn tại
    if (fs.existsSync(thumbnailPath)) {
      const thumbnailImage = fs.readFileSync(thumbnailPath);
      res.setHeader("Content-Type", "image/webp");
      return res.send(thumbnailImage); // Gửi lại ảnh thumbnail
    } else {
      return res.status(404).send("Thumbnail not found");
    }
  }

  // Nếu không có thumbnail, xử lý ảnh gốc
  const imagePath = path.join(__dirname, src);

  if (!fs.existsSync(imagePath)) {
    return res.status(404).send("Image not found");
  }

  const originalImage = fs.readFileSync(imagePath);

  try {
    const resizedImageBuffer = await sharp(originalImage)
      .resize(width) // Nếu width không undefined, nó sẽ resize
      .webp({ quality }) // Chuyển đổi và nén thành WebP
      .toBuffer();

    // Đặt header content type đúng cho hình ảnh WebP
    res.setHeader("Content-Type", "image/webp");
    return res.send(resizedImageBuffer); // Gửi lại ảnh đã được resize
  } catch (err) {
    console.error("Error processing image:", err);
    return res.status(500).send("Error processing image");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
