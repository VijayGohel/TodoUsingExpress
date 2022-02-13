const express = require("express");
const bodyparser= require("body-parser");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

var todoItems=["Buy Food","Wash cloths"];
var workItems=[];

app.get("/" , (req,res)=>{
    const date = new Date();

    var options = { weekday: 'long', day: 'numeric', month: 'long',year: 'numeric'};

    var formatedDate = date.toLocaleDateString("en-US", options);

    res.render("todo", {Title:formatedDate, todoItems:todoItems});
})

app.get("/work" , (req,res)=>{
    res.render("todo", {Title:"Work List", todoItems:workItems});
})

app.post("/", (req,res)=>{
    
    if(req.body.button === "Work List")
    {
        workItems.push(req.body.newItem);
        res.redirect("/work");
    }
    else
    {
        todoItems.push(req.body.newItem);
        res.redirect("/");
    }
})

app.listen(3000 , ()=>{
    console.log("Server started on 3000");
})