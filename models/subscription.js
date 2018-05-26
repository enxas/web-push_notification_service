const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema({
	endpoint: { type: String, index: true },
    keys: {
        auth: { type: String },
        p256dh: { type: String }
    },
    created: {type: Date, default: Date.now }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);