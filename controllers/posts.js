import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

const getPosts = async (req, res) =>{
    try{
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    }catch(error){
        res.status(404).json({message:error.message});
    }
}

const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);

   try{
        await newPost.save();
        res.status(201).json(newPost);
    }catch(error){
        res.status(409).json({message:error.message});
    }
}

const updatePost = async (req, res) => {
    const {id:_id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) 
        return res.status(404).send('No post found with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new:true});
    res.json(updatedPost);

}

const deletePost = async (req, res) => {
    const {id} = req.params;

    try{
        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json('Post not found with this id');

        await PostMessage.findByIdAndRemove(id);
        res.json({message:'Post deleted successfully'});
    }catch(error){
        res.status(400).json({message:error.message});
    }
}

const likePost = async (req, res) => {
    const {id} = req.params;

    try{
        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json('Post not found with that id');

        const post = await PostMessage.findById(id);
        const updatedPostLike = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new:true});

        res.json(updatedPostLike);
    }catch(error){
        console.log(error);
        res.status(400).json({message:error.message});
    }
}

export {getPosts, createPost, updatePost, deletePost, likePost};