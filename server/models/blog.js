import mongoose from 'mongoose';


const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    name: {
        String
    },
    creator: String,
    tags: [String],
    imageFile: String,
    createdAt: {
      type: Date,
      default: new Date(),
    },
    likes: {
      type: [String],
      default: [],
    },

  });


  export default mongoose.model('Blog', blogSchema)