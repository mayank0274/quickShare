const mongoose = require("mongoose")

const fileSchema = mongoose.Schema({
  fileName : {
    type:String,
    required:true
  },
  path : {
    type:String,
    required:true
  },
  size : {
    type: Number,
    required : true
  },
  uuid : {
    type:String,
    required:true
  }
},{timestamps:true});

const FileData = mongoose.model("FileData",fileSchema);

module.exports = FileData;
