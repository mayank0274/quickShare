const router = require("express").Router()
const FileData = require("../models/fileStr")



router.get("/:uuid", async (req,res)=>{
  const file = await FileData.findOne({uuid:req.params.uuid});
  
  if(!file){
    res.render("downloadError",{
      error : "Link has been expired"
    })
  }
  
  const filePath = `${__dirname}/../upload/${file.fileName}`;
  
  

  res.download(filePath);
 


})

module.exports = router;
