import expres from 'express';
import BlogModel from '../models/blog.js';
import mongoose from 'mongoose';



export const createBlog = async (req,res) => {
    const blog = req.body;
    const newBlog =  new BlogModel({
        ...blog,
        creator: req.userId,
        createdAt: new Date().toISOString()
    });



    try {
        await newBlog.save();
        res.status(201).json(newBlog);
        
    } catch (error) {
        res.status(404).json({message: "Something went wrog"});
        
    }
};


export const getBlogs = async (rerq,res) => {

    try {
        const blogs = await BlogModel.find();
        res.status(200).json(blogs);
        
    } catch (error) {
        res.status(404).json({message: "Somthing went wrong"});
        
    }
}


export const getBlog = async (req,res) => {
    const {id} = req.params;


    try {
        const blog = await BlogModel.findById(id);
        res.status(200).json(blog);
        
    } catch (error) {
        res.status(404).json({message: "Somthing went wrong"});
        
    }
}

export const getBlogByuser = async (req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: "User does't exist"})
    }

    const blogs = await BlogModel.find({creator: id});
    res.status(200).json(blogs);
}