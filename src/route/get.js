const express = require('express');
const router = express.Router();
const Post = require('../models/post');

//GET 
router.get('/',verify,async(req,res) =>{
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message: err});
    }
})

//specific Post
router.get('/:postId',verify,async(req,res)=>{
    //console.log(req.params.postId)
     try{
         const post =await Post.findById(req.params.postId)
         res.json(post)
     }catch(err){
         res.json({message: err});
     }    
});