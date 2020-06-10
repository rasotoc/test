const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const verify = require('./verifytoke');
//GET 
router.get('/',verify,async(req,res) =>{
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message: err});
    }
})

//Submit Post
router.post('/',verify,async(req,res)=>{
    const post = new Post({
        uuid: req.body.uuid,
        created: req.body.created,
        updated: req.body.updated,
        quantity: req.body.quantity,
        cost: req.body.cost,
        tax: req.body.tax,
        status: req.body.status,
        img: req.body.img,
        img_url: req.body.img_url
    });
    response ={
        mensaje: 'success'
    }
    try{
        const savedPost = await post.save()
        res.json(data);
    } catch (err){
        res.json({message: err});
    }
   
});

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
//delete post
router.delete('/:postId',verify,async(req,res)=>{
    //console.log(req.params.postId)
     try{
         const removePost =await Post.remove({_id: req.params.postId})
         res.json(removePost )
     }catch(err){
         res.json({message: err});
     }    
});

//Update a post
router.patch('/:postId',verify,async(req,res)=>{
    //console.log(req.params.postId)
     try{
         const updatePost =await Post.updateOne(
             {_id: req.params.postId},
             {$set:{status:req.body.status}})
         res.json(updatePost )
     }catch(err){
         res.json({message: err});
     }    
});

module.exports = router;