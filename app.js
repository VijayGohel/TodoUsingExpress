const express = require("express");
const bodyparser= require("body-parser");
const date = require(__dirname+"/date");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/TodoList");

const todoSchema = {
    name:String
}

const todo = mongoose.model("todoList",todoSchema);

// var todoItems=["Buy Food","Wash cloths"];
// var workItems=[];

// const task1 = new todo({name:"Buy food"});

// task1.save();

app.get("/" , (req,res)=>{
    
    todo.find((err,result)=>{
        res.render("todo", {Title:date.getDate(), todoItems:result});
    })
    
})

// app.get("/work" , (req,res)=>{
//     res.render("todo", {Title:"Work List", todoItems:workItems});
// })

app.post("/", (req,res)=>{
    
    if(req.body.button === "Work List")
    {
        workItems.push(req.body.newItem);
        res.redirect("/work");
    }
    else
    {
        // todoItems.push(req.body.newItem);
        new todo({
            name:req.body.newItem
        }).save();
        res.redirect("/");
    }
})

app.post("/delete",(req,res)=>{

    console.log(req.body);

    todo.deleteOne({_id:{$eq:req.body.checkbox}},(err)=>{
        if(err)
                console.log(err);
            else
                console.log("Item deleted successfully");
    })
    res.redirect("/");

})

app.listen(3000 , ()=>{
    console.log("Server started on 3000");
})