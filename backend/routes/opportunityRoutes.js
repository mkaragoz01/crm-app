const express = require('express');
const router = express.Router();
const opportunityController = require('../controllers/opportunityController.js');
const {verifyToken, allowRoles} = require('../middlewares/authMiddleware.js');

router.post('/', verifyToken, allowRoles('admin', 'sales'), opportunityController.createOpportunity);
router.get('/', verifyToken, allowRoles('admin', 'sales'), opportunityController.getMyOpportunities);
router.get('/:id', verifyToken, allowRoles('admin', 'sales'), opportunityController.getOpportunityById);
router.put('/:id', verifyToken, allowRoles('admin', 'sales'), opportunityController.updateOpportunity);
router.delete('/:id', verifyToken, allowRoles('admin', 'sales'), opportunityController.deleteOpportunity);

module.exports = router;
