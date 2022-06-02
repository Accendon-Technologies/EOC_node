var multer = require('multer');
const path = require('path')
exports.storage = (data) => multer.diskStorage({
  
    destination: (req, file, cb) => {
       
        cb(null, data.path);
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

exports.fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|pdf|txt|doc|docx|csv|xlsx|xls)$/)) {
        req.fileValidationError = 'Only image and document files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
}

