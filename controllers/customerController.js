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

exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, company, notes } = req.body;

    const customer = await Customer.findById(id);
    if (!customer) return res.status(404).json({ message: "Müşteri bulunamadı" });

    if (customer.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Bu müşteri üzerinde işlem yapma izniniz yok" });
    }

    customer.name = name || customer.name;
    customer.email = email || customer.email;
    customer.phone = phone || customer.phone;
    customer.company = company || customer.company;
    customer.notes = notes || customer.notes;

    await customer.save();

    res.status(200).json({ message: "Müşteri başarıyla güncellendi", customer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ message: "Müşteri bulunamadı" });
    }

    if (customer.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Bu müşteri üzerinde işlem yapma izniniz yok" });
    }

    await customer.deleteOne();
    res.status(200).json({ message: "Müşteri başarıyla silindi" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ message: "Müşteri bulunamadı" });
    }

    if (customer.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Bu müşteri üzerinde işlem yapma izniniz yok" });
    }

    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
