const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const RegisterModel = require("./models/user");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

mongoose
  .connect(
    "mongodb+srv://tewodroshabtamu29:1234tttt@cluster0.oxizy.mongodb.net/Fana_Digital_Liberary?"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email || !email.endsWith("@aau.edu.et")) {
    return res.status(400).json({ error: "Email must end with '@aau.edu.et'" });
  }
  next();
};

app.post("/check-email", async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await RegisterModel.findOne({ email });
    if (existingUser) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (err) {
    console.error("Error checking email:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await RegisterModel.findOne({ email });

    if (user) {
      // Check if the email is verified
      if (!user.verified) {
        return res.json({
          success: false,
          error: "Email not verified. Please check your inbox.",
        });
      }

      // If the email is verified, check the password
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        res.json({ success: true });
      } else {
        res.json({ success: false, error: "Incorrect password" });
      }
    } else {
      res.json({ success: false, error: "No record found for this email" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.post("/register", validateEmail, async (req, res) => {
  try {
    const { email, password, ...otherData } = req.body;

    const existingUser = await RegisterModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const register = await RegisterModel.create({
      email,
      password: hashedPassword,
      ...otherData,
    });

    res.status(201).json({ success: true, data: register });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/send-verification", async (req, res) => {
  const { email } = req.body;

  try {
    const token = crypto.randomBytes(32).toString("hex");

    const user = await RegisterModel.findOneAndUpdate(
      { email },
      { verificationToken: token },
      { new: true, upsert: false }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const verificationLink = `http://localhost:3001/verify/${token}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "tewodroshabtamu29@gmail.com",
        pass: "fqgy owab qkbh vwwf",
      },
    });

    const mailOptions = {
      from: "tewodroshabtamu29@gmail.com",
      to: email,
      subject: "Verify your email",
      text: `Click the link to verify your email: ${verificationLink}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Verification email sent." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

app.get("/verify/:token", async (req, res) => {
  const { token } = req.params;

  try {
    // Find the user by the verification token
    const user = await RegisterModel.findOneAndUpdate(
      { verificationToken: token },
      { verified: true, verificationToken: null }, // Mark as verified and remove the token
      { new: true }
    );

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    // Redirect or send a response to the user
    res.json({ success: true, message: "Email verified successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.listen(3001, () => {
  console.log("Server is running");
});
