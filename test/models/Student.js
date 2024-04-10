const mongoose = require('mongoose');
const StudentSchema = new mongoose.Schema({
  studentcode: { type: String, unique: true, required: true, match: true },
  name: { type: String },
  email: { type: String },
  studypoints: { type: Number },
  grades: [{ type: [GradeSchema], required: true }],
});
