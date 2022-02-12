const express = require("express");
const bodyparser= require("body-parser");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({extended:true}));

var todoItems=["Buy Food","Wash cloths"];

app.get("/" , (req,res)=>{
    const date = new Date();

    var options = { weekday: 'long', day: 'numeric', month: 'long',year: 'numeric'};

    var formatedDate = date.toLocaleDateString("en-US", options);

    res.render("todo", {Date:formatedDate, todoItems:todoItems});
})


app.post("/", (req,res)=>{
    todoItems.push(req.body.newItem);
    res.redirect("/");
})
app.listen(3000 , ()=>{
    console.log("Server started on 3000");
})