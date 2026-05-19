const Invoice = require('../models/Invoice');

const isOwnerOrAdmin = async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('client');
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

    const isOwner = invoice.client._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (isOwner || isAdmin) {
      return next();
    }

    return res.status(403).json({ message: 'Access denied' });
  } catch (err) {
    res.status(500).json({ message: 'Authorization check failed', error: err.message });
  }
};

module.exports = isOwnerOrAdmin;
