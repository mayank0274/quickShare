const router = require("express").Router()
const multer = require("multer")
const path = require("path")
const FileData = require("../models/fileStr")
const {
  v4: uuid4
} = require("uuid")

//multer configuration

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    
const uniqueName = `${new Date().getTime().toString()}-${Math.random()*1000}${path.extname(file.originalname)}`;

cb(null,uniqueName);
  },
});

const upload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 1000000*200 //200mb
  }
});

// post request

router.post("/", upload.single("myFile"), async (req, res) => {
  
  console.log(req.file);
  
try {
 // store in database
    const file= new FileData({
      fileName: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      uuid: uuid4()
    });

    const fileResponse = await file.save()

  
  //res link
  res.status(200).json({
      fileLink: `${process.env.APP_BASE_URL}/files/${fileResponse.uuid}`
    
  });
} catch (err) {
  res.status(500).json({
   error: "error in uploading file"
  });
}
  
  
});

module.exports = router
