import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());

const uploadsDir = "./uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname); // Get the file extension
    const fileName = Date.now() + fileExtension; // Use a timestamp to avoid name collision
    cb(null, fileName); // Save the file with the new name
  },
});

// Initialize multer with the specified storage settings
const upload = multer({ storage: storage });

// Route to handle image upload
app.post("/upload", upload.single("image"), (req, res) => {
  if (req.file) {
    // Return the relative image path after the upload
    const imagePath = `/uploads/${req.file.filename}`;
    res.json({ success: true, imagePath }); // Send image path back to the client
  } else {
    res.status(400).json({ success: false, message: "No file uploaded" });
  }
});

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
