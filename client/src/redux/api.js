import axios from "axios";
const API = axios.create({baseURL: "http://localhost:5000"});

API.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile")).token
        }`;
    }
    return req;
})



export const signIn = (formData) => API.post("/users/signin", formData)
export const signUp = (formData) => API.post("/users/signup", formData);
export const googleSignIn = (result) => API.post("/users/googleSignIn", result);

export const createBlog = (blogData) => API.post("/blogs", blogData);
export const getBlogs = () => API.get("/blogs");
export const getBlog = (id) => API.get(`/blogs/${id}`);
export const getBlogsByuser = (userId) => API.get(`/blogs/userBlogs/${userId}`);
