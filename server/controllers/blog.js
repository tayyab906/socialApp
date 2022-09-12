import expres from 'express';
import BlogModel from '../models/blog.js';
import mongoose from 'mongoose';



export const createBlog = async (req,res) => {
    const blog = req.body;
    // const newBlog =  new BlogModel({
    //     ...blog,
    //     creator: req.userId,
    //     createdAt: new Date().toISOString()
    // });

    const newBlogs = await BlogModel.create({
        ...blog,
        creator: req.userId,
        createdAt: new Date().toISOString()

    })



    try {
        await newBlogs.save();
        res.status(201).json(newBlogs);
        
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
    console.log(id)
    if(!mongoose.Types.ObjectId.isValid(id)){
        console.log(id)
        return res.status(404).json({message: "User does't exist"})

    }

    const blogs = await BlogModel.find({creator: id});
    res.status(200).json(blogs);
}

export const deleteBlog = async(req,res) => {
    const {id} = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            console.log(id)
            return res.status(404).json({message: `No blog exist with id: ${id}`});
    
    
        }
        await BlogModel.findByIdAndRemove(id);
        res.json({message: "Blog Delted Successfully"})
        
    } catch (error) {
        res.status(404).json({message: "Somthing went wrong"});
        
    }
}


export const updateBlog = async(req,res) => {
    const {id} = req.params;
    const {title, description, creator, imageFile, tags} = req.body;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            console.log(id)
            return res.status(404).json({message: `No blog exist with id: ${id}`});
    
    
        }
        const updatedBlog = {
            creator,
            title,
            description,
            tags,
            imageFile,
            _id: id,
        }
        await BlogModel.findByIdAndUpdate(id, updatedBlog, {new: true});
        res.json(updatedBlog);
        
    } catch (error) {
        res.status(404).json({message: "Somthing went wrong"});
        
    }
}