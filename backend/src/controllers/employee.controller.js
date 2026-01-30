const employeeService = require("../services/employee.service");

// ------------------------------
// Get all employees (optional search)
// ------------------------------
exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await employeeService.getAll(req.query.search);
    res.json(employees);
  } catch (err) {
    next(err);
  }
};

// ------------------------------
// Get employee by ID
// ------------------------------
exports.getEmployeeByEmpId = async (req, res, next) => {
  try {
    const employee = await employeeService.getByEmpId(req.params.empId);
    if (!employee) {
      return res.status(404).json({ status: 404, message: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    next(err);
  }
};

// ------------------------------
// Create a single employee
// ------------------------------
exports.createEmployee = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
        doj:req.body.doj
    };

    const employee = await employeeService.create(payload);

    res.status(201).json({
      status: 201,
      message: "Employee created successfully",
      data: employee,
    });
  } catch (err) {
    next(err);
  }
};


// ------------------------------
// Update a single employee by empId
// ------------------------------
exports.updateEmployee = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      ...(req.body.doj && { doj: req.body.doj }) // optional
    };

    const updated = await employeeService.update(req.params.empId, payload);

    if (!updated)
      return res.status(404).json({ status: 404, message: "Employee not found" });

    res.json({
      status: 200,
      message: "Employee updated successfully",
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

// ------------------------------
// Delete a single employee
// ------------------------------
exports.deleteEmployee = async (req, res, next) => {
  try {
    const deleted = await employeeService.delete(req.params.empId);
    if (!deleted) {
      return res.status(404).json({ status: 404, message: "Employee not found" });
    }
    res.json({ status: 200, message: "Employee deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// ------------------------------
// Bulk create employees
// ------------------------------
exports.bulkCreateEmployees = async (req, res, next) => {
  try {
    const result = await employeeService.bulkCreate(req.body);
    res.status(201).json({
      status: 201,
      message: "Bulk create successful",
      insertedCount: result.length,
    });
  } catch (err) {
    next(err);
  }
};

// ------------------------------
// Bulk update employees
// ------------------------------
exports.bulkUpdateEmployees = async (req, res, next) => {
  try {
    const result = await employeeService.bulkUpdate(req.body);
    res.json({
      status: 200,
      message: "Bulk update successful",
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    next(err);
  }
};

// ------------------------------
// Bulk delete employees
// ------------------------------
exports.bulkDeleteEmployees = async (req, res, next) => {
  try {
    const result = await employeeService.bulkDelete(req.body.empIds);
    res.json({
      status: 200,
      message: "Bulk delete successful",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    next(err);
  }
};
