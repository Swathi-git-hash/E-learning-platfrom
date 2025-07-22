import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", courses: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/api/students")
      .then(res => setStudents(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...form, courses: form.courses.split(",") };
    axios.post("http://localhost:5000/api/students", data)
      .then(res => {
        setStudents([...students, res.data.student]);
        setForm({ name: "", email: "", courses: "" });
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>E-Learning Platform</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} /><br />
        <input type="email" placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} /><br />
        <input type="text" placeholder="Courses (comma separated)" value={form.courses}
          onChange={(e) => setForm({ ...form, courses: e.target.value })} /><br />
        <button type="submit">Add Student</button>
      </form>
      <h3>Student List</h3>
      <ul>
        {students.map((s, i) => (
          <li key={i}>{s.name} - {s.email} - {s.courses.join(", ")}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;