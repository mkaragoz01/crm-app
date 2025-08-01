const mongoose = require("mongoose");
const { isEmail, isMobilePhone } = require("validator");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [isEmail, "Lütfen geçerli bir e-posta adresi girin."]
    },
    phone: {
      type: String,
      required: true,
      validate: [isMobilePhone, "Lütfen geçerli bir telefon numarası girin."]
    },
    company: {
      type: String,
      default: ""
    },
    notes: {
      type: String,
      default: ""
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Customer", customerSchema);
