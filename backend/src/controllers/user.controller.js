import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Basic Validation

        if (!username || !password || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        //Create a new user

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                email: user.email,
                username: user.username
            }
        });    
} catch (error) {
        res.status(500).json({ message: "Sorry,Internal server error", error: error.message });
}
};

const loginUser = async (req, res) => {
    try {
        //Checking if the user exists in the database
        const { email, password } = req.body;

        const user = await User.findOne({
             email: email.toLowerCase()
        }); 

        if (!user) return res.status(404).json({ 
            message: "User not found"
        });

        //Compare Passwords
        const isMatch = await user.comparePassword(password);   
        if (!isMatch) return res.status(400).json({
            message: "Invalid credentials"
        });

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                email: user.email,
                username: user.username
            }
        });
    } catch (error) {
            res.status(500).json({ message: "Sorry,Internal server error", error: error.message });
        }
};

const logOutUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ 
            email: email.toLowerCase()
        });
        if (!user) return res.status(404).json({
            message: "User not found"
        });

        res.status(200).json({
            message: "Logged out successfully"
        });

    } catch (error) {
        res.status(500).json({ message: "Sorry,Internal server error", error: error.message });
    }
};

// Export all controller functions once at the bottom
export { registerUser, loginUser, logOutUser };