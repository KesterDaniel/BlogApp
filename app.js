const express = require ("express")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const port = process.env.PORT || 3000
const app = express()


//App Config
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(methodOverride("_method"))


//Mongoose/Model Config
mongoose.connect("mongodb://127.0.0.1:27017/BlogApp", {
    useUnifiedTopology: true
})

const blogSchema = mongoose.Schema({
    title: String,
    body: String,
    image: String,
    created: {
        type: Date,
        default: Date.now
    }
})
const Blog = mongoose.model("Blog", blogSchema)


//ROOT ROUTE
app.get("/", (req, res)=>{
    res.redirect("/blogs")
})

//INDEX ROUTE
app.get("/blogs", async(req, res)=>{
    try {
        const allBlogs = await Blog.find({})
        res.render("index", { allBlogs })
    } catch (error) {
        console.log(error)
    }
})

// NEW ROUTE
app.get("/blogs/new", (req, res)=>{
    res.render("new")
})

//CREATE ROUTE
app.post("/blogs", async(req, res)=>{
    const Blogdata = req.body.blog
    try {
         await Blog.create(Blogdata)
         console.log("New blog created")
         res.redirect("/blogs")
    } catch (error) {
        res.render("new")
    }
})
//SHOW ROUTE
app.get("/blogs/:id", async(req, res)=>{
    const BlogId = req.params.id
    try {
        const chosenBlog = await Blog.findById(BlogId)
        res.render("show", { chosenBlog })
    } catch (error) {
        res.redirect("/blogs")
    }
})

//EDIT ROUTE
app.get("/blogs/:id/edit", async(req, res)=>{
    const damnedId = req.params.id
    try {
        const damnedBlog = await Blog.findById(damnedId)
        res.render("edit", { damnedBlog })
    } catch (error) {
        res.redirect("/blogs")
    }
})

//UPDATE ROUTE
app.put("/blogs/:id", async(req, res)=>{
    const risenId = req.params.id
    const newdata = req.body.blog
    try {
        await Blog.findByIdAndUpdate(risenId, newdata)
        res.redirect(`/blogs/${risenId}`)
        console.log("Updated Blog!!")
    } catch (error) {
        res.redirect("/blogs")
    }
})

app.listen(port, ()=>{
    console.log("Blogapp is up!!")
})

