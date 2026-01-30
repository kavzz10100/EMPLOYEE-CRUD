import { useEffect, useState } from "react";
import "../styles/main.css";
/*import {
  createEmployee,
  updateEmployee
} from "../services/employeeService"; */


const EmployeeFormModal = ({ employee, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    doj: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});

  /* ---------- Prefill / Reset ---------- */
  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        email: employee.email || "",
        phone: employee.phone || "",
        designation: employee.designation || "",
        department: employee.department || "",
        doj: employee.doj ? employee.doj.slice(0, 10) : "",
        status: employee.status || "Active",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        designation: "",
        department: "",
        doj: "",
        status: "Active",
      });
    }
    setErrors({});
  }, [employee]);

  /* ---------- Field Validator ---------- */
  const validateField = (name, value) => {
  if (!value || !value.trim()) return "This field is required";

  // Match backend email regex: any valid email
  if (name === "email") {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(value)) return "Invalid email format";
  }
  if (name === "phone") {
    const phoneRegex = /^\d{9,15}$/;
    if (!phoneRegex.test(value)) return "Phone must be 9–15 digits";
  }

  return "";
};

  /* ---------- Validate All (on submit) ---------- */
const validateForm = () => {
  const newErrors = {};

  Object.keys(formData).forEach((key) => {
    const error = validateField(key, formData[key]);
    if (error) newErrors[key] = error;
  });

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  
  /* ---------- Live Change ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };



/* ---------- Submit / Save ---------- */
const handleSubmit = (e) => {
  e.preventDefault(); // stop page reload

  if (!validateForm()) return; // stop if validation fails

  // Construct the employee object from form fields
  const emp = {
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  designation: formData.designation,
  department: formData.department,
  doj: formData.doj,    
  status: formData.status,
};

  // Call handleSave (which does create/update)
  onSave(emp);
};


  return (
    <div className="modal-overlay">
      <div className="modal-container modern-form">
        <h2>{employee ? "Edit Employee" : "Add Employee"}</h2>

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="form-field">
            <label>Name *</label>
            <input name="name" value={formData.name} onChange={handleChange}
              className={errors.name ? "input-error" : ""} />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="form-field">
            <label>Email *</label>
            <input name="email" value={formData.email} onChange={handleChange}
              className={errors.email ? "input-error" : ""} />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          {/* Phone */}
          <div className="form-field">
            <label>Phone *</label>
            <input name="phone" value={formData.phone} onChange={handleChange}
              className={errors.phone ? "input-error" : ""} />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          {/* Designation */}
          <div className="form-field">
            <label>Designation *</label>
            <input name="designation" value={formData.designation}
              onChange={handleChange}
              className={errors.designation ? "input-error" : ""} />
            {errors.designation && <span className="error">{errors.designation}</span>}
          </div>

          {/* Department */}
          <div className="form-field">
            <label>Department *</label>
            <input name="department" value={formData.department}
              onChange={handleChange}
              className={errors.department ? "input-error" : ""} />
            {errors.department && <span className="error">{errors.department}</span>}
          </div>

          {/* DOJ */}
          <div className="form-field">
            <label>Date of Joining *</label>
            <input type="date" name="doj" value={formData.doj}
              onChange={handleChange}
              className={errors.doj ? "input-error" : ""} />
            {errors.doj && <span className="error">{errors.doj}</span>}
          </div>

          {/* Status */}
          <div className="form-field">
            <label>Status *</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="submit">
              {employee ? "Update" : "Save"}
            </button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeFormModal;
