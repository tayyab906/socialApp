import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import morgan from 'morgan';
import userRouter from './routes/userRoute.js'
import blogRouter from './routes/blogRouter.js'








const app = express();
app.use(morgan("dev"));
app.use(express.json({limit: "30mb" , extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors())

app.use("/users", userRouter)
app.use("/blogs", blogRouter )

const MONGODB_URL = 'mongodb+srv://tayyab:Viteace123@cluster0.k4rq6n1.mongodb.net/socialApp?retryWrites=true&w=majority'


const PORT = 5000;

mongoose.connect(MONGODB_URL)
.then(() => {
    console.log('Connnected to mongodb')
})
.catch((error) => {
    console.log(error)
})


app.get('/', (req,res) => {
    res.send("hello server");
});


app.listen(PORT, () => {
    console.log("Server is running on 5000")
})