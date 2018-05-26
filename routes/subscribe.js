const express = require("express");
const router = express.Router();
const SubscriptionController = require('../controllers/subscription');

router.post("/subscribe", SubscriptionController.subscribe);
router.get("/subscribers", SubscriptionController.subscribers);
router.post("/sendNotifications", SubscriptionController.sendNotifications);

module.exports = router;