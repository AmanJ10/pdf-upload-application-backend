import multer from "multer";
import path from "path";
import { ensureUploadsDir } from "../utils/ensureUploads.js";

// ensure uploads folder exists
const UPLOAD_DIR = ensureUploadsDir();

// disk storage with unique filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safeName = file.originalname
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_\-\.]/g, "");
    const filename = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}-${safeName}${ext}`;
    cb(null, filename);
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype !== "application/pdf") {
    cb(new Error("Only PDF files are allowed"));
  } else {
    cb(null, true);
  }
}

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max - adjust if needed
  fileFilter,
});
