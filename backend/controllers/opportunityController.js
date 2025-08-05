const Opportunity = require('../models/Opportunity');

exports.createOpportunity = async (req, res) => {
  try {
    const { title, status, value, customerId } = req.body;

    const opportunity = new Opportunity({
      title,
      status,
      value,
      customer: customerId,
      createdBy: req.user.id,
    });

    await opportunity.save();
    res.status(201).json({ message: "Fırsat başarıyla oluşturuldu", opportunity });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyOpportunities = async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { createdBy: req.user._id };
    const opportunities = await Opportunity.find(filter).populate('customer', 'name email');

    res.status(200).json(opportunities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOpportunityById = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id).populate('customer', 'name');
    if (!opportunity) return res.status(404).json({ message: "Fırsat bulunamadı" });

    if (opportunity.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Yetkisiz erişim" });
    }

    res.status(200).json(opportunity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status, value } = req.body;

    const opportunity = await Opportunity.findById(id);
    if (!opportunity) return res.status(404).json({ message: "Fırsat bulunamadı" });

    if (opportunity.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Yetkisiz erişim" });
    }

    opportunity.title = title || opportunity.title;
    opportunity.status = status || opportunity.status;
    opportunity.value = value ?? opportunity.value;

    await opportunity.save();
    res.status(200).json({ message: "Fırsat güncellendi", opportunity });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) return res.status(404).json({ message: "Fırsat bulunamadı" });

    if (opportunity.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Yetkisiz erişim" });
    }

    await opportunity.deleteOne();
    res.status(200).json({ message: "Fırsat silindi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
