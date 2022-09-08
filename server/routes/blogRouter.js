import express from 'express';
const router = express.Router();

import { createBlog, getBlog, getBlogByuser, getBlogs } from '../controllers/blog.js';
import auth from '../middleware/auth.js';


router.post("/",auth, createBlog);
router.get('/', getBlogs)
router.get('/:id', getBlog)
router.get('userBlogs/:id',auth, getBlogByuser)

export default router;