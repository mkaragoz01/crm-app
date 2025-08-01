const Customer = require('../models/Customer');

exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phone, company, notes } = req.body;

    const existing = await Customer.findOne({ email });
    if (existing) return res.status(400).json({ message: "E-posta zaten kayıtlı" });

    const customer = new Customer({
      name,
      email,
      phone,
      company,
      notes,
      createdBy: req.user.id
    });

    await customer.save();
    res.status(201).json({ message: "Müşteri başarıyla oluşturuldu", customer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyCustomers = async (req, res) => {
  try {
    let customers;

    if (req.user.role === 'admin') {
      customers = await Customer.find({});
    } else {
      customers = await Customer.find({ createdBy: req.user.id });
    }

    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
