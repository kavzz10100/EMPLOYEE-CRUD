const express = require("express");
const router = express.Router();
const controller = require("../controllers/employee.controller");
const { validateSingleEmployee } = require("../middleware/validate");

// ------------------------------
// Bulk operations
// ------------------------------
router.post("/bulk-create", controller.bulkCreateEmployees);
router.put("/bulk-update", controller.bulkUpdateEmployees);
router.delete("/bulk-delete", controller.bulkDeleteEmployees);

// Get all employees (+ search)
router.get("/", controller.getAllEmployees);

// Get by empId
router.get("/:empId", controller.getEmployeeByEmpId);

// Create single employee (with validation middleware)
router.post("/", validateSingleEmployee, controller.createEmployee);

// Update single by empId
router.put("/:empId", controller.updateEmployee);

// Delete single by empId
router.delete("/:empId", controller.deleteEmployee);

module.exports = router;
