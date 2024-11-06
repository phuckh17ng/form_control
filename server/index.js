const express = require("express");
const path = require("path");
const app = express();
const port = 8888;

const imagePath = path.join(__dirname, "images");

app.get("/public/images/image1.png", (req, res) => {
  res.sendFile(path.join(imagePath, "image1.png"));
});
app.get("/public/images/image2.png", (req, res) => {
  res.sendFile(path.join(imagePath, "image2.png"));
});
app.get("/public/images/image3.png", (req, res) => {
  res.sendFile(path.join(imagePath, "image3.png"));
});
app.get("/public/images/image4.png", (req, res) => {
  res.sendFile(path.join(imagePath, "image4.png"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
