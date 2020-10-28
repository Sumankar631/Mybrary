const { urlencoded } = require('express');
const express = require('express');
const router = express.Router();
const Author = require('../models/author');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended:false});

//all author routes
router.get('/',async(req,res)=>{
    let searchoption = {};
    if(req.query.name != null && req.query.name !==''){
        searchoption.name = new RegExp(req.query.name, 'i');
        }
    try {
        const authors =await Author.find(searchoption);
        res.render('authors/index',{
            authors: authors,
            searchoption : req.query
        });
    } catch {
        res.redirect('/');
    }
});

//new author route
router.get('/new',(req,res)=>{
    res.render('authors/new',{author:new Author()});
});

//create author route
router.post('/',urlencodedParser,async(req,res)=>{
    const author=new Author({
       name:req.body.name 
    })
   /* author.save((err, newAuthor)=>{
        if(err){
            res.render('authors/new',{
                author:author,
                errorMessage:'Error creating author'
            })
        } else{
            res.redirect(`authors`);
        }
    })*/

    try{
        const newAuthor = await author.save();
        res.redirect(`authors`);
    } catch{
        res.render('authors/new',{
            author:author,
            errorMessage:'Error creating author'
        })
    }






});

module.exports=router;