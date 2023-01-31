const router = require("express").Router()
const FileData = require("../models/fileStr")



router.get("/:uuid",async (req,res)=>{
  try{
    const file = await FileData.findOne({uuid:req.params.uuid});
    
    if(!file){
    res.render("downloadError",{
      error : "error : { file is missing}"
    })
    }
    
    res.render("download",{
      fileName : file.fileName,
      size :  (file.size*0.000977) + " KB",
      link : `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
    })
  }
  catch(err){
    res.render("downloadError",{
      error : "something went wrong"
    })
  }
})

module.exports = router;
