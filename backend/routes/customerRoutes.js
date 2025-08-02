const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController.js');
const { verifyToken, allowRoles } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, allowRoles('admin', 'sales'), customerController.createCustomer);
router.get('/', verifyToken, allowRoles('admin', 'sales'), customerController.getMyCustomers);
router.put('/:id', verifyToken, allowRoles('admin', 'sales'), customerController.updateCustomer);
router.delete('/:id', verifyToken, allowRoles('admin', 'sales'), customerController.deleteCustomer);
router.get('/:id', verifyToken, allowRoles('admin', 'sales'), customerController.getCustomerById);

module.exports = router;