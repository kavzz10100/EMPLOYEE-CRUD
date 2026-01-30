const employeeRepo = require("../repositories/employee.repository");

class EmployeeService {
  validateEmployee(data) {
    const requiredFields = [
      "name",
      "email",
      "phone",
      "designation",
      "department",
       "doj",
      "status"
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        throw new Error(`${field} is required`);
      }
    }
  }

  handleDuplicateError(error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      throw new Error(`${field} already exists`);
    }
    throw error;
  }

  async create(employeeData) {
    try {
      this.validateEmployee(employeeData);
      return await employeeRepo.create(employeeData);
    } catch (error) {
      this.handleDuplicateError(error);
    }
  }

  async bulkCreate(employees) {
    if (!Array.isArray(employees) || employees.length === 0) {
      throw new Error("Request body must be a non-empty array");
    }

    try {
      employees.forEach(emp => this.validateEmployee(emp));
      return await employeeRepo.createMany(employees);
    } catch (error) {
      this.handleDuplicateError(error);
    }
  }

  async getAll(search) {
    return employeeRepo.getAll(search);
  }

  async getByEmpId(empId) {
    if (!empId) throw new Error("Employee ID is required");
    return employeeRepo.getByEmpId(empId);
  }

  async update(empId, data) {
    if (!empId) throw new Error("Employee ID is required");
    if (!data || Object.keys(data).length === 0) {
      throw new Error("Update data cannot be empty");
    }

    try {
      return await employeeRepo.update(empId, data);
    } catch (error) {
      this.handleDuplicateError(error);
    }
  }

  async delete(empId) {
    if (!empId) throw new Error("Employee ID is required");
    return employeeRepo.delete(empId);
  }

  async bulkUpdate(employees) {
    if (!Array.isArray(employees) || employees.length === 0) {
      throw new Error("Bulk update requires a non-empty array");
    }
    return employeeRepo.bulkUpdate(employees);
  }

  async bulkDelete(empIds) {
    if (!Array.isArray(empIds) || empIds.length === 0) {
      throw new Error("empIds must be a non-empty array");
    }
    return employeeRepo.bulkDelete(empIds);
  }
}

module.exports = new EmployeeService();
