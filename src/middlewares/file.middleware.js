const multer = require("multer"); // npm i multer
const path = require("path");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
  destination: (req, file, cb) => {
    const folder = path.join(__dirname, "../../public/uploads");
    cb(null, folder);
  },
});

const VALID_FILE_TYPES = ["image/png", "image/jpg", "image/jpeg"];

const fileFilter = (req, file, cb) => {
  if (!VALID_FILE_TYPES.includes(file.mimetype)) {
    const error = new Error("File type not supported");
    cb(error);
  } else {
    cb(null, true);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = { upload };
