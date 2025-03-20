const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Post = require("./Models/post");
const path = require("path");
const methodOverride = require("method-override");


MONGO_URL = "mongodb://127.0.0.1:27017/Blog";

main()
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true}));
app.use(methodOverride("_method"));

app.get("/Home", (req, res) => {
  res.render("posts/home.ejs");
});

//index route
app.get("/posts", async (req,res)=>{
  const allPosts = await Post.find({});
  res.render("posts/index.ejs", { allPosts });
});

//New route
app.get("/posts/new", (req,res)=>{
  res.render("posts/new.ejs");
});

//Create route
app.post("/posts",async (req,res)=>{
  
  const newPost = new Post(req.body.post);
  await newPost.save();
  res.redirect("/posts");
  console.log(newPost);
})

//edit route
app.get("/posts/:id/edit", async (req,res)=>{
  let { id } = req.params;
  const post = await Post.findById(id);
  res.render("posts/edit.ejs", { post });
});

//update route
app.put("/posts/:id",async (req,res)=>{
    let { id } = req.params;
    await Post.findByIdAndUpdate(id, {...req.body.post});
    res.redirect("/posts");
})
//delete route
app.delete("/posts/:id", async (req,res)=>{
  let { id } = req.params;
  let deletedPost = await Post.findByIdAndDelete(id);
  console.log(deletedPost);
  res.redirect("/posts");
})
//show route
app.get("/posts/:id", async (req,res)=>{
  let { id } = req.params;
  const post = await Post.findById(id);
  res.render("posts/show.ejs", { post });
})


// app.get("/test", async (req, res) => {
//   let sample = new Post({
//     name: "abc",
//     title: "Blog",
//     description: "new blog",
//     date: new Date(),
//   });

//   await sample.save();
//   console.log("saved");
//   res.send("saveddd");
// });

app.listen(8000, () => {
  console.log("Listening to the PORT 8000");
});
