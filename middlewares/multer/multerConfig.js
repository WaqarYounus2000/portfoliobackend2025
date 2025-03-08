const multer = require('multer');
const path = require('path');


// this is only for uploading file in express server, i mean disk storage, it will create a folder <upload> in backend and will store all the files
// Storage configuration

// const storage = multer.diskStorage({destination: function (req, file, cb) {cb(null, 'uploads/')},
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });


//// this is will just keep the file in memory until it is uploaded to somewhere
const storage = multer.memoryStorage(); 

// File filter to allow only images/pdf
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg','application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, and JPG images are allowed!'), false);
  }
};

const upload = multer({storage: storage,fileFilter: fileFilter});

module.exports = upload;
