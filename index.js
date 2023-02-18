require('dotenv').config()
const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const hbs = require("hbs")
const path = require("path")
const cors = require("cors")
require("./db/conn")
const FileData = require("./models/fileStr")
const fs = require("fs")
const CronJob = require('cron').CronJob;

app.set("view engine", "hbs")


app.use("/api/files",require("./routes/files"))

app.use("/files", require("./routes/downloadPage"))

app.use("/files/download", require("./routes/download"))



app.use(express.static(__dirname + '/public'));



app.get("/", (req, res)=> {
  res.render("homepage");
})


// auto delete

const job = new CronJob(
  '*/15 * * * * *',
  function() {

    // Get all records older than 24 hours
    async function fetchData() {
      
      const files = await FileData.find({
        createdAt: {
          $lt: new Date(Date.now() - 24 * 60 * 60 * 1000)}
      })

   //const files = await FileData.find();

    
      if (files.length) {
        for (const file of files) {
          try {
            fs.unlinkSync(file.path);
             await file.remove();
            console.log(`successfully deleted ${file.fileName}`);
          } catch(err) {
            console.log(`error while deleting file ${err} `);
          }
        }
      }
    
    }

    fetchData()
  },
  null,
  true,
  'Asia/Kolkata'
);


app.listen(port, ()=> {
  console.log(`listening to port ${port}`);
})
