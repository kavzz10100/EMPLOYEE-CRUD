const emailRegex = /^\S+@\S+\.\S+$/;
const phoneRegex = /^\d{9,15}$/;

const REQUIRED_FIELDS = [
  "name",
  "email",
  "phone",
  "designation",
  "department",
  "doj",
  "status"
];

function validateRequiredFields(emp) {
  const missing = [];
  for (const field of REQUIRED_FIELDS) {
    if (!emp[field] || emp[field].toString().trim() === "") {
      missing.push(`${field} is required`);
    }
  }
  return missing;
}

function employeeValidate(emp) {
  const errors = [];

  if (emp.email && !emailRegex.test(emp.email)) {
    errors.push("Invalid email format");
  }

  if (emp.phone && !phoneRegex.test(emp.phone)) {
    errors.push("Phone must be 10–15 digits");
  }

  return errors;
}

module.exports = {
  validateRequiredFields,
  employeeValidate
};
