const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const salt = 10;

// Esto lo comentamos, no funciona de momento por falta de función de validación.

// const userSchema = new mongoose.Schema({
//   name: { type: String, unique: true, trim: true, required: true },
//   password: { type: String, trim: true, required: true },
//   email: {
//     type: String,
//     unique: true,
//     required: [true, "Email address is required"],
//     validate: {
//       validator: validatorPackage.isEmail,
//       message: "Please provide a valid email",
//     },
//   },
// });

// userSchema.pre("save", (next) => {
//   if (this.password) {
//     this.password = bcrypt.hashSync(this.password, salt);
//   }
//   next();
// });

// const User = mongoose.model("users", userSchema);
// module.exports = User;
