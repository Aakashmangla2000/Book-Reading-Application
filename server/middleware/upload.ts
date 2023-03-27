const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req: Request, file: File, callback: any) {
    callback(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req: Request, file: any, callback: any) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 },
});

export default upload;
