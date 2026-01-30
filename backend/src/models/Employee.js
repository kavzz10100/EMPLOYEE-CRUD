const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    empId: {
      type: String,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      unique: true,
      required: true
    },
    designation: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "Active"
    },
   doj: {
      type: String,required :true
    }
  }
);

/* ================================
   EMP ID GENERATOR (NO COUNTER)
================================ */
async function generateEmpId() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `EMP${random}`;
}

/* ================================
   PRE-SAVE HOOK
employeeSchema.pre("save", async function () {
  if (!this.isNew || this.empId) return next();

  let isUnique = false;

  while (!isUnique) {
    const newEmpId = await generateEmpId();
    const exists = await mongoose.models.Employee.findOne({ empId: newEmpId });

    if (!exists) {
      this.empId = newEmpId;
      isUnique = true;
    }
  }
});**/

module.exports = mongoose.model("Employee", employeeSchema);
