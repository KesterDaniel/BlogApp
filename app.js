const express = require ("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const port = process.env.PORT || 3000
const app = express()


//App Config
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))


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

//Restful Routes



app.listen(port, ()=>{
    console.log("Blogapp is up!!")
})

