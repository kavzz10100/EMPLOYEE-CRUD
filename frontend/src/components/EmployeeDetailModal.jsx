const EmployeeDetailModal = ({ employee, onClose, onEdit }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="detail-header">
          <h3>Employee Details</h3>
          {/* Close X at top-right */}
          <button className="close-x-top" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="detail-content">
          <div className="detail-row">
            <span className="label">Employee ID:</span>
            <span className="value">{employee.empId}</span>
          </div>
          <div className="detail-row">
            <span className="label">Name:</span>
            <span className="value">{employee.name}</span>
          </div>
          <div className="detail-row">
            <span className="label">Email:</span>
            <span className="value">{employee.email}</span>
          </div>
          <div className="detail-row">
            <span className="label">Phone:</span>
            <span className="value">{employee.phone}</span>
          </div>
          <div className="detail-row">
            <span className="label">Designation:</span>
            <span className="value">{employee.designation}</span>
          </div>
          <div className="detail-row">
            <span className="label">Department:</span>
            <span className="value">{employee.department}</span>
          </div>
          <div className="detail-row">
            <span className="label">Date of Joining:</span>
            <span className="value">{employee.doj}</span>
          </div>
          <div className="detail-row">
            <span className="label">Status:</span>
            <span
              className={
                employee.status === "Active"
                  ? "status-active"
                  : "status-inactive"
              }
            >
              {employee.status}
            </span>
          </div>
        </div>

        <div className="form-actions" style={{ marginTop: "20px" }}>
          <button className="edit-btn" onClick={onEdit}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailModal;
