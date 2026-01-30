import { useState, useEffect } from "react";

import SearchBar from "../components/SearchBar";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeFormModal from "../components/EmployeeFormModal";
import EmployeeDetailModal from "../components/EmployeeDetailModal";
import "../styles/main.css";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [viewEmployee, setViewEmployee] = useState(null);


  /* ---------- FETCH EMPLOYEES ---------- */
  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      console.log("API response:", res.data);
      setEmployees(Array.isArray(res.data) ? res.data : []);

    } catch (err) {
      console.error("Fetch error:", err);
      setEmployees([]);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  /* ---------- SEARCH ---------- */
  const filteredEmployees = employees.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------- SAVE / UPDATE ---------- */
const handleSave = async (emp) => {
  try {
    console.log("Saving employee:", emp); // debug log
    if (editEmployee) {
      await updateEmployee(editEmployee.empId, emp);
      alert("Employee updated successfully");
    } else {
      await createEmployee(emp);
      alert("Employee added successfully");
    }

    await fetchEmployees();
    setOpenForm(false);
    setEditEmployee(null);
  } catch (err) {
    console.error("Save failed:", err.response?.data || err.message);
    alert("Error saving employee: " + (err.response?.data?.message || err.message));
  }
};



  /* ---------- DELETE ---------- */
 const handleDelete = async (empId) => {
  if (!window.confirm("Are you sure you want to delete this employee?")) return;

  try {
    await deleteEmployee(empId);
    await fetchEmployees();
    alert("Employee deleted successfully");

  } catch (err) {
    console.error("Delete failed:", err);
    alert("Error deleting employee");
  }
};


 return (
  <div className="page-container">
    <div className="app-header">Employee Management System</div>

    <div className="top-bar">
      <SearchBar value={search} onChange={setSearch} />
      <button className="add-btn" onClick={() => setOpenForm(true)}>
        Add Employee
      </button>
    </div>

    <div className="table-card">
      <EmployeeTable
        employees={filteredEmployees}
        onView={setViewEmployee}
        onEdit={(emp) => {
          setEditEmployee(emp);
          setOpenForm(true);
        }}
        onDelete={handleDelete}
      />
    </div>

    {openForm && (
      <EmployeeFormModal
        employee={editEmployee}
        onSave={handleSave}
        onClose={() => {
          setOpenForm(false);
          setEditEmployee(null);
        }}
      />
    )}

    {viewEmployee && (
      <EmployeeDetailModal
        employee={viewEmployee}
        onClose={() => setViewEmployee(null)}
        onEdit={() => {
          setEditEmployee(viewEmployee);
          setOpenForm(true);
          setViewEmployee(null);
        }}
      />
    )}
  </div>
);

};

export default EmployeeList;
 