const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/elearning", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Schemas
const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  courses: [String],
});

const Student = mongoose.model("Student", StudentSchema);

// API Routes
app.post("/api/students", async (req, res) => {
  const { name, email, courses } = req.body;
  const student = new Student({ name, email, courses });
  await student.save();
  res.json({ message: "Student added", student });
});

app.get("/api/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

