const express= require('express');
const app= express();
const Author= require('../model/author');

//all authors route
app.get('/', async (req,res)=>{
    let searchOption= {};
    if(req.query.name !== null && req.query.name !== ''){
        searchOption.name=new RegExp(req.query.name, 'i');
    };
    try{
        const authors= await Author.find(searchOption);
        res.render('authors/index',
        {
        authors:authors,
        searchOption:req.query
        });
    }catch{
        res.redirect('/');
    }
});

// new authors route
app.get('/new',function(req,res){
    res.render('authors/new',{author: new Author()});
});

// create author route
app.post('/', async (req,res)=>{
    const author = new Author({
        name:req.body.name
    });
    
    try {
       const newAuthor= await author.save();  
       //res.redirect(`authors/${newAuthor.id}`)
       res.redirect(`author`);
    } catch { 
        res.render('authors/new', {
                 locals:{errorMessage:"Error creating new Author"},
                 author:author
               });
        }
     });



module.exports =app;