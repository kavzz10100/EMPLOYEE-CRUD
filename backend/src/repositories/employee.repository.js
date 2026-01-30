const Employee = require("../models/Employee");
const Counter = require("../models/Counter");

class EmployeeRepository {
  // GET all or search
  async getAll(search) {
    if (search) {
      const regex = new RegExp(search, "i");
      return Employee.find({
        $or: [{ name: regex }, { empId: regex }, { department: regex }],
      }).sort({ createdAt: -1 });
    }
    return Employee.find().sort({ createdAt: -1 });
  }

  // GET by empId
  async getByEmpId(empId) {
    return Employee.findOne({ empId });
  }

  // ✅ Atomic EMP ID generator
async generateEmpId() {
  const counter = await Counter.findOneAndUpdate(
    { name: "employee" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return `EMP${counter.seq.toString().padStart(4, "0")}`;
}

  // CREATE single employee
async create(employeeData) {
  const empId = await this.generateEmpId(); // ✅ generate new ID
  const employee = new Employee({ ...employeeData, empId });
  return employee.save(); // saves to MongoDB
}

  // CREATE many employees
  async createMany(employees) {
    const counter = await Counter.findOneAndUpdate(
      { name: "employee" },
      { $inc: { seq: employees.length } },
      { new: true, upsert: true }
    );

    let seqStart = counter.seq - employees.length + 1;

    const payload = employees.map((e) => ({
      ...e,
      empId: "EMP" + seqStart++,
    }));

    return Employee.insertMany(payload, { ordered: false });
  }

  // UPDATE single
  async update(empId, updateData) {
    return Employee.findOneAndUpdate({ empId }, updateData, {
      new: true,
      runValidators: true,
    });
  }

  // DELETE single
  async delete(empId) {
    return Employee.findOneAndDelete({ empId });
  }

  // BULK update
  async bulkUpdate(employees) {
    const bulkOps = employees.map((emp) => {
      const { empId, _id, createdAt, updatedAt, __v, ...updateFields } = emp;
      return {
        updateOne: {
          filter: { empId },
          update: { $set: updateFields },
          upsert: false,
        },
      };
    });
    return Employee.bulkWrite(bulkOps);
  }

  // BULK delete
  async bulkDelete(employees) {
    const empIds = employees.map((e) => e.empId);
    return Employee.deleteMany({ empId: { $in: empIds } });
  }
}

module.exports = new EmployeeRepository();
