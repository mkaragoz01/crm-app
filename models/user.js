const mongoose = require("mongoose");
const {isEmail} = require("validator");

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  email: {
     type: String, 
     required: true, 
     unique: true,
     validate: [isEmail, 'Lütfen geçerli bir e-posta adresi girin.']
    },
  password: { 
    type: String, 
    required: true 
},
  role: { 
    type: String, 
    enum: ['admin', 'sales', 'customer'], 
    default: 'sales' 
}
},
{ 
    timestamps: true 
});

module.exports = mongoose.model('User', userSchema);