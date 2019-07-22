const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    console.log('id', req.body.id);
    cb(null, req.body.id);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  }
  cb(null, false);
};

module.exports.upload = multer({ storage, fileFilter });
