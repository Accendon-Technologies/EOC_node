const multer = require('multer');
const path = require('path');
const sql = require("./../config/db");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/service_files/');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const extensionFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|pdf|txt|doc|docx|csv|xlsx|xls)$/)) {
    req.fileValidationError = 'Only image and document files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

exports.uploadServiceFile = (req, res) => {
  let upload = multer({ storage: storage, fileFilter: extensionFilter }).single('file');

  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    }
    else if (!req.file) {
      return res.send('Please select a file to upload');
    }
    else if (err instanceof multer.MulterError) {
      return res.send(err);
    }
    else if (err) {
      return res.send(err);
    }

    _addFile(_buildData(req), (err, result) => {
      if (err)
        res.status(500).send({
          success_status: false,
          message:
            err || "Some error occurred while uploading files."
        });
      else res.send({ success_status: true, data: result })
    })

  });

};

_buildData = (req) => {
  let _data = {
    'service_type': req.body.service_type,
    'file_name': req.file.filename,
    'file_path': req.file.path,
    'file_mime_type': req.file.mimetype,
    'file_type': req.file.encoding,
    'created_at': (new Date().getTime() / 1000),
    'status': 1
  };
  if (_data['service_type'] == 'M')
    _data['estimate_id'] = req.body.estimate_id;
  else
    _data['service_id'] = req.body.service_id;
  return _data;
}

_addFile = (data, result) => {
  (async (result) => {
    const qb = await sql.get_connection();

    try {


      const insert_data = await qb.insert('service_files', data, (err, res) => {
        if (err) return result({ kind: err }, null);

        result(null, { status: 1, id: res.insert_id });
        return;
      });

    } catch (err) {
      if (err) {
        result(null, err);
        return;
      }
    } finally {
      qb.release();
    }
  })(result)

}