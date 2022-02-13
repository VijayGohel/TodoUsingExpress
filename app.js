const express = require("express");
const bodyparser= require("body-parser");
const date = require(__dirname+"/date");

const app = express();

app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

var todoItems=["Buy Food","Wash cloths"];
var workItems=[];

app.get("/" , (req,res)=>{
    

    res.render("todo", {Title:date.getDate(), todoItems:todoItems});
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