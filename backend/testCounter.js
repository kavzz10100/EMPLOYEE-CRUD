const mongoose = require("mongoose");
const Counter = require("./src/models/Counter"); // adjust path

mongoose.connect("mongodb://127.0.0.1:27017/EmployeeSystem")
.then(async () => {
  console.log("MongoDB connected ✅");

  const counter = await Counter.findOneAndUpdate(
    { name: "employee" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  console.log(counter); // ✅ Should print {_id, name: 'employee', seq: ...}
  process.exit(0);
})
.catch(console.error);
