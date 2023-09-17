import mongoose from 'mongoose';

const employeeDetailSchema = new mongoose.Schema({
  empId: String,
  username: String,
  companyEmail: String,
  designation: String,
  salary: Number,
  role: String,
});

const EmployeeDetailsDB = mongoose.model('employee', employeeDetailSchema);

export default EmployeeDetailsDB;