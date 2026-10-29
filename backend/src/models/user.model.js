import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,   //removes whitespace ie ignores spaces btn characters
            minLength: [3, "Username must be at least 3 characters long"],
            maxLength: [10, "Username must be at most 20 characters long"],
        },

        password: {
            type: String,
            required: true,
            unique: true,
            minLength: [6, "Password must be at least 6 characters long"],
            maxLength: [50, "Password must be at most 50 characters long"],
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,   //removes whitespace ie ignores spaces btn characters

        },
        
    },

    {
        timestamps: true,
    }
);

// Before saving the user, hash the password
userSchema.pre("save", async function () {
  // If the password wasn't modified, skip hashing
  if (!this.isModified("password")) return;
  
  try {
    // Hash the password using bcryptjs with 10 salt rounds
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    throw error; // Mongoose will catch this and fail the save operation
  }
});


//Compare Passwords
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User", userSchema);

