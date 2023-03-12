import multer from "multer";
import { __basedir } from "../index.js";

// img filter
const imageFilter = (req, file, callback) => {
  console.log("called 1");
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(null, Error("Please upload only images."));
  }
};

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `image-${Date.now()}.${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
export default uploadFile;
