import express from 'express';
const router = express.Router();

import { createBlog, deleteBlog, getBlog, getBlogByuser, getBlogs, updateBlog } from '../controllers/blog.js';
import auth from '../middleware/auth.js';


router.post("/",auth, createBlog);
router.get('/', getBlogs)
router.get('/:id', getBlog)
router.delete('/:id',auth, deleteBlog)
router.patch('/:id',auth, updateBlog)
router.get('/userBlogs/:id',auth, getBlogByuser)


export default router;