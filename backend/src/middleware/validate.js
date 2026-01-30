const {
  validateRequiredFields,
  employeeValidate
} = require("../validators/employeeValidator");

exports.validateSingleEmployee = (req, res, next) => {
   console.log("Request body:", req.body); 
  const errors = [
    ...validateRequiredFields(req.body),
    ...employeeValidate(req.body)
  ];

  if (errors.length > 0) {
    return res.status(400).json({
      status: 400,
      message: "Validation failed",
      errors
    });
  }

  next();
};
