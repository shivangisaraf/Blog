const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  title:{
    type: String,
    required: true
  },
  description:{
    type:String,
    required: true
  },
  image:{
    type: String,
    default: "https://www.shutterstock.com/shutterstock/videos/1106757365/thumb/8.jpg?ip=x480",
    set: (v) => {
      return v ===""?"https://www.shutterstock.com/shutterstock/videos/1106757365/thumb/8.jpg?ip=x480": v
    }
  },
  date:{
    type: Date,
    default: Date.now()
  }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;