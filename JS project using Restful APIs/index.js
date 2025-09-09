const express = require("express");
const app = express();
const path = require("path");
const port = 3000
const { v4: uuidv4 } = require('uuid');
const method_overide = require("method-override")
// const buttons = document.querySelectorAll("button");
// // for(let btn of buttons) {
//     btn.addEventListener("click", ()=> {
//         app.delete("/post/:id", )
//     })
// }
let posts = [ 
    {
    id : uuidv4(),
    username: "yash vishwakarma", 
    content: "I want to tour the world"
        }
    , 
    {
    id : uuidv4(),
    username : "rohit raj", 
    content: "I love boxing"
    }
    , 
    {
        id: uuidv4(),
        username: "Rohan cariappa",
        content: "I love breaking down rap verses"
    }
]


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"))
app.use (express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(method_overide("_method"));
app.listen(port, ()=> {
    console.log("Listening requests...")
})


//index route --> All the posts in the database will be visible here
app.get('/posts',(req, res)=> {
    res.render("index", {posts})
  
})



//creating and adding a new post
app.get('/posts/new', (req, res)=> {
    res.render("newpost")
})
app.post('/posts', (req, res)=> {
    if(req.body) {
        let {username, content} = req.body;
        posts.push({id : uuidv4() ,username, content })
        res.redirect("/posts")
       
    }
    else {
         res.render("index", {posts})
    }
    
    
    
})

//view a particular post
app.get('/post/:id', (req, res)=> {
    let {id}  = req.params;
    res.render("post",{id, posts})
})


//update a particular post
app.get('/post/:id/edit', (req, res)=> {
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("update", {id, post});
})
app.patch('/post/:id',(req, res)=> {
    let {id} = req.params;
    let New_content = req.body.content;
    let post = posts.find((p)=> id === p.id);
    post.content = New_content;
    res.redirect("/posts")
    // res.render("update", id)

})

//delete a post
app.delete('/posts/:id', (req, res)=> {
    let {id} = req.params;
    // let post = posts.find((p)=> id === p.id);
    posts = posts.filter((p)=> id != p.id);
    res.redirect("/posts");
})

// app.patch('/')
