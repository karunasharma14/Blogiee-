import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// css files static use

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//--------------------------------------------------

let blogs = [];

app.get('/blogs', (req, res) => {
  res.json(blogs);
});

app.post('/blogs', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newBlog = { title, content };
  blogs.push(newBlog);

  res.status(201).json(newBlog);
});



app.delete('/blogs', (req, res) => {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required for deletion' });
    }
  
    const index = blogs.findIndex(blog => blog.title === title);
    if (index !== -1) {
      const deletedPost = blogs.splice(index, 1)[0];
      res.status(200).json(deletedPost);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  });
  
 
  

//-------------------------------------------------------



app.get("/", (req,res)=>{
    res.render("index.ejs");
});

app.get("/about", (req,res)=>{
    res.render("about.ejs");
});

app.get("/post", (req,res)=>{
    res.render("posts.ejs");
});
app.get("/submit", (req,res)=>{
    const topicBlog = req.body.topic;
    const dateBlog = req.body.date;
    const textBlog = req.body.text;
    res.render("posts.ejs",{topicBlog, dateBlog, textBlog});
});

app.get("/contact", (req,res)=>{
    res.render("contact.ejs");
});

app.listen(port, ()=>{
    console.log(`listening to port ${port}.`);
});