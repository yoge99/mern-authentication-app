import bcrypt from "bcryptjs";
import User from "../models/User.js";

// ✅ Signup Controller
export const signupUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: "All fields are required ⚠️",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists 😕",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Signup successful 🎉",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during signup 😔",
    });
  }
};

// ✅ Signin Controller
export const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required ⚠️",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found 😕",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password ❌",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Signin successful ✅",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Signin Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during signin 😔",
    });
  }
};
