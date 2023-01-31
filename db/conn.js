const mongoose = require("mongoose")

mongoose.connect(`${process.env.MONGO_CONN_URL}`)
.then(()=>{
  console.log("connection success");
})
.catch((err)=>{
  console.log("error")
})
