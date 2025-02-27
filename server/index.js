require("dotenv").config(); 

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
  .connect(process.env.MONGO_URI) 
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
        user: process.env.GMAIL_USER, // Use environment variable for Gmail user
        pass: process.env.GMAIL_PASS, // Use environment variable for Gmail password
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
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
    const user = await RegisterModel.findOneAndUpdate(
      { verificationToken: token },
      { verified: true, verificationToken: null },
      { new: true }
    );

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    res.json({ success: true, message: "Email verified successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const axios = require("axios");


app.get("/books", async (req, res) => {
  const queries = [
    "electrical engineering textbook",
    "mechanical engineering textbook",
    "civil engineering textbook",
    "software engineering textbook",
    "chemical engineering textbook",
    "biomedical engineering textbook",
  ];

  const departmentKeywords = {
    Electrical: [
      "electric",
      "circuit",
      "electronics",
      "electrical",
      "power",
      "voltage",
      "current",
      "semiconductor",
      "signal",
      "control systems",
      "microprocessor",
      "electromagnetic",
      "digital",
      "communication systems",
      "energy",
      "motor",
      "transformer",
      "power systems",
      "electromagnetics",
      "antenna",
    ],
    Biomedical: [
      "biomedical",
      "health",
      "medicine",
      "anatomy",
      "physiology",
      "biomechanics",
      "medical devices",
      "biotechnology",
      "clinical",
      "healthcare",
      "bioengineering",
      "medical imaging",
      "biomaterials",
      "bioinformatics",
      "rehabilitation",
      "medical electronics",
      "biomedical instrumentation",
    ],
    Chemical: [
      "chemical",
      "chemistry",
      "reaction",
      "materials",
      "process",
      "fluid",
      "thermodynamics",
      "polymer",
      "organic",
      "inorganic",
      "biochemical",
      "mass transfer",
      "unit operations",
      "reactor design",
      "separation process",
      "heat transfer",
      "chemical process",
      "petrochemical",
    ],
    Mechanical: [
      "mechanical",
      "machines",
      "design",
      "thermodynamics",
      "robotics",
      "automotive",
      "manufacturing",
      "dynamics",
      "fluid mechanics",
      "heat transfer",
      "mechanics",
      "machine design",
      "CAD",
      "HVAC",
      "kinematics",
      "vibration",
      "mechatronics",
      "strength of materials",
      "thermal",
    ],
    Civil: [
      "civil",
      "construction",
      "structures",
      "buildings",
      "structural",
      "concrete",
      "transportation",
      "geotechnical",
      "environmental",
      "hydraulics",
      "surveying",
      "foundation",
      "steel design",
      "water resources",
      "bridge",
      "earthquake",
      "soil mechanics",
      "construction management",
    ],
    Software: [
      "software",
      "programming",
      "code",
      "developer",
      "web",
      "computer",
      "database",
      "algorithm",
      "network",
      "security",
      "system",
      "application",
      "data structures",
      "operating system",
      "artificial intelligence",
      "machine learning",
      "cyber",
      "cloud computing",
      "information technology",
      "IT",
    ],
  };

  function determineDepartment(title, description, categories) {
    const contentToCheck = `${title} ${description} ${categories?.join(
      " "
    )}`.toLowerCase();
    let maxMatches = 0;
    let bestDepartment = "Not Specified";

    for (const [department, keywords] of Object.entries(departmentKeywords)) {
      const matches = keywords.filter((keyword) =>
        contentToCheck.includes(keyword.toLowerCase())
      ).length;

      if (matches > maxMatches) {
        maxMatches = matches;
        bestDepartment = department;
      }
    }

    return maxMatches > 0 ? bestDepartment : "Not Specified";
  }

  try {
    const allBooks = [];

    for (const query of queries) {
      const apiUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(
        query
      )}&limit=10`;
      const response = await axios.get(apiUrl);

      if (response.data.docs) {
        const books = response.data.docs.map((book) => ({
          id: book.key,
          title: book.title || "Untitled",
          author: book.author_name ? book.author_name.join(", ") : "Unknown",
          description: book.first_publish_year
            ? `Published in ${book.first_publish_year}`
            : "No description available",
          thumbnail: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "",
          previewLink: `https://openlibrary.org${book.key}`,
          department: determineDepartment(
            book.title,
            book.first_publish_year,
            book.subject
          ),
          publishedDate: book.first_publish_year,
          pageCount: book.number_of_pages_median,
          categories: book.subject,
          language: book.language?.[0],
        }));
        allBooks.push(...books);
      }
    }

    // Remove duplicates based on book ID and title
    const uniqueBooks = Array.from(
      new Map(allBooks.map((book) => [book.id + book.title, book])).values()
    );

    // Sort books by department
    const sortedBooks = uniqueBooks.sort((a, b) => {
      if (a.department === "Not Specified") return 1;
      if (b.department === "Not Specified") return -1;
      return a.department.localeCompare(b.department);
    });

    res.json({
      success: true,
      books: sortedBooks,
    });
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch books",
      error: err.message,
    });
  }
});


app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT || 3001}`);
});
