import { Post } from "../models/post.model.js";

//Create a post
export const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;

    if(!name || !description || !age) {
      return res.status(400).json({ 
        message: "All fields are required" });
    }

    const post = await Post.create({ name, description, age });
    res.status(201).json({
        message: "Post created successfully",
    });
  } catch (error) {
    res.status(500).json({ 
        message: "Internal server error",
        error: error.message 
    });
  }
};

 //Read all posts 
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ 
            message: "Internal server error",
            error: error.message 
        });
    }
};

//Update a Post
export const updatePost = async (req, res) => {
    try {
        // Basic Validation to check if the body is empty or not
        // {name: "John", description: "y", age: z} => {name, description, age} => Object.keys(req.body) => ["name", "description", "age"] => length = 3
        // {} = truthy, which is false
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ 
                message: "No data provided for update"
            });
        }
 
    const post = await Post.findByIdAndUpdate(req.params.id, req.body,
        {new: true});

        if(!post) {
            return res.status(404).json({ 
                message: "Post not found"
            });
        }

        res.status(200).json({
            message: "Post Updated Successfully",
            post
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Internal server error",
            error: error.message 
        });
    }
};

export const deletePost = async (req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json({
            message: "Post deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};