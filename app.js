const express = require("express");
const bodyparser= require("body-parser");
const date = require(__dirname+"/date");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/TodoList");

const todoSchema = {
    name:String
}

const listSchema={
    name:String,
    items:[todoSchema]
}
const todo = mongoose.model("todoList",todoSchema);

const List= mongoose.model("List",listSchema);
// var todoItems=["Buy Food","Wash cloths"];
// var workItems=[];

// const task1 = new todo({name:"Buy food"});

// task1.save();

app.get("/" , (req,res)=>{
    
    todo.find((err,result)=>{
        res.render("todo", {Title:date.getDate(), todoItems:result});
    })
    
})

app.get("/:listName", (req,res)=>{
    const listName = _.capitalize(req.params.listName);

    List.findOne({name:listName},(err,result)=>{
        
        if(!err){
            if(!result){
                const list = new List({
                    name: listName,
                    items:[]
                })
            
                list.save();
                res.render("todo", {Title:listName, todoItems:list.items});  
            }
            else
                res.render("todo", {Title:listName, todoItems:result.items});  
        }
        
    })
    
    
})
// app.get("/work" , (req,res)=>{
//     res.render("todo", {Title:"Work List", todoItems:workItems});
// })

app.post("/", (req,res)=>{
    
    const newListItem = new todo({
        name:req.body.newItem
    });

    if(req.body.button === date.getDate())
    {
        // todoItems.push(req.body.newItem);
        newListItem.save();
        res.redirect("/");
    }
    else
    {
        // List.updateOne({name:req.body.button}, {items: []},(err)=>{
        //     if(!err)
        //         res.redirect("/"+req.body.button);
        // });

        List.findOne({name:req.body.button}, (err,result)=>{
            // console.log(result);
            result.items.push(newListItem);
            result.save();
            // console.log(result);
            res.redirect("/"+result.name);
        })
        // workItems.push(req.body.newItem);
        
    }
})

app.post("/delete",(req,res)=>{

    // console.log(req.body);
    if(req.body.ListName === date.getDate()){
        todo.deleteOne({_id:{$eq:req.body.checkbox}},(err)=>{
            if(err)
                    console.log(err);
                else
                    console.log("Item deleted successfully");
        })
        res.redirect("/");
    }
    else
    {
        List.findOneAndUpdate({name:req.body.ListName}, {$pull:{items:{_id:req.body.checkbox}}},(err,result)=>{
            if(!err)
            {   
                res.redirect("/"+req.body.ListName);
            }
        });
        
    }
})

app.listen(3000 , ()=>{
    console.log("Server started on 3000");
})