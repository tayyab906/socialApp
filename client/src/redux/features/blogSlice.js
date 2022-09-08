import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as api from '../api';



export const createBlog = createAsyncThunk("blog/createBlog", async({updatedBlogData, navigate, toast}, {rejectWithValue}) => {
    try {
        const response = await api.createBlog(updatedBlogData);
        toast.success("Blog Added Successfully");
        navigate("/");
        return response.data;

        
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data)
        
    }
});


export const getBlogs = createAsyncThunk("blog/getBlogs", async(_, {rejectWithValue}) => {
    try {
        const response = await api.getBlogs();
        return response.data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data)
        
    }
    
});


export const getBlog = createAsyncThunk("blog/getBlog", async(id, {rejectWithValue}) => {
    try {
        const response = await api.getBlog(id);
        return response.data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data)
        
    }
    
});


export const getBlogsByuser = createAsyncThunk("blog/getBlogsByuser", async(userId, {rejectWithValue}) => {
    try {
        const response = await api.getBlogsByuser(userId);
        return response.data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data)
        
    }
    
});





const blogSlice = createSlice({
    name:"blog",
    initialState:{
        blog: {},
        blogs: [],
        userBlogs: [],
        error: "",
        loading: false,
    },
    extraReducers:{
        [createBlog.pending]: (state, action) => {
            state.loading = true
        },
        [createBlog.fulfilled]: (state, action) => {
            state.loading = false;
            state.blogs = [action.payload]
        },    
        [createBlog.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getBlogs.pending]: (state, action) => {
            state.loading = true
        },
        [getBlogs.fulfilled]: (state, action) => {
            state.loading = false;
            state.blogs = action.payload;
        },    
        [getBlogs.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getBlog.pending]: (state, action) => {
            state.loading = true
        },
        [getBlog.fulfilled]: (state, action) => {
            state.loading = false;
            state.blog = action.payload;
        },    
        [getBlog.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getBlogsByuser.pending]: (state, action) => {
            state.loading = true
        },
        [getBlogsByuser.fulfilled]: (state, action) => {
            state.loading = false;
            state.getBlogsByuser = action.payload;
        },    
        [getBlogsByuser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        
    },
});

export default blogSlice.reducer;