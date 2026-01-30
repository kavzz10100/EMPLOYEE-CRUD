const EmployeeTable = ({ employees, onView, onEdit, onDelete }) => {
  return (
    <div className="table-container">
    <table className="employee-table">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Emp ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Designation</th>
          <th>Department</th>
          <th>DOJ</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {employees.length === 0 ? (
          <tr>
            <td colSpan="7">No employees found</td>
          </tr>
        ) : (
          employees.map((emp,index) => (
            <tr key={emp.empId}>
              <td>{index + 1}</td> 
              <td>{emp.empId}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.designation}</td>
              <td>{emp.department}</td>
             <td>{emp.doj ? new Date(emp.doj).toISOString().slice(0,10) : "-"}</td>

            <td className={   emp.status === "Active" ? "status-active" : "status-inactive" }> {emp.status}</td>

              <td className="action-buttons">
                {/* ✅ VIEW */}
                <button className="view-btn" onClick={() => onView(emp)}>View</button>

                {/* ✅ EDIT */}
                <button className="edit-btn" onClick={() => onEdit(emp)}>Edit</button>

                {/* ✅ DELETE */}
                <button
                  className="delete-btn"
                  onClick={() => onDelete(emp.empId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
</div>

  );
};

export default EmployeeTable;
