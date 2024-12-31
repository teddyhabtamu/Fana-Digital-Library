const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  verificationToken: { type: String, default: null },
});

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  department: {
    type: String,
    enum: [
      "Electrical",
      "Biomedical",
      "Chemical",
      "Mechanical",
      "Civil",
      "Software",
    ],
    required: true,
  },
  fileUrl: { type: String, required: true }, // URL or path to the book file
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the uploader
  createdAt: { type: Date, default: Date.now },
});

const RegisterModel = mongoose.model("User", UserSchema);
const BookModel = mongoose.model("Book", BookSchema);

module.exports = RegisterModel;
