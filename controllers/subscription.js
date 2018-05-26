const mongoose = require("mongoose");
const webpush = require('web-push');

const Subscription = require("../models/subscription");

exports.subscribe = (req, res, next) => {
	function saveNewValue(subscriptionData) {
		console.log(subscriptionData);
		return Subscription.create({
			endpoint: subscriptionData.endpoint,
			keys: {
				auth: subscriptionData.keys.auth,
				p256dh: subscriptionData.keys.p256dh
			},

		}).then(null, function(err) {
			if (err.code === 11000) {
				return Subscription.findOne({data: subscriptionData}).exec();
			} else {
				throw err;
			}
		});
	}

	saveNewValue(req.body).then(function(doc) {
		// success
		console.log('success', doc);
		res.status(200).json({
          message: "SUCCESS"
        });
	}, function(err) {
		// failure
		console.log('failure', err);
		res.status(404).json({
          message: err
        });
	});

};

exports.subscribers = (req, res, next) => {
	Subscription.find()
    .exec()
    .then(docs => {
      const response = {
        amount: docs.length,
      };
      if (docs.length >= 0) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: "No entries found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });

};

exports.sendNotifications = (req, res, next) => {
	console.log('Got notification');
	const pushPayload = JSON.stringify({ 
		title: req.body.title, 
		message: req.body.message,
		action1_title: req.body.action_text,
		icon: req.body.icon_url,
		notification_url: req.body.notification_url,
		offer_url: req.body.action_url,
		hide_sec: parseInt(req.body.notification_timer)  
	});

	const options = {
		vapidDetails: {
			subject: 'https://www.google.com',
			publicKey: '',
			privateKey: ''
		},
		TTL: 86400, // 86400 equals to one day
		contentEncoding: 'aes128gcm'
	};
	
	const init = async function() {
		
    try {
        const cursor = Subscription.find().cursor();
        await cursor.eachAsync(function(sub) {
			webpush.sendNotification({
				endpoint: sub.endpoint,
				keys: {
					auth: sub.keys.auth,
					p256dh: sub.keys.p256dh
				}
			}, pushPayload, options)
            .then(function(push) {
                console.log(push);
            })
            .catch(function(e) {
                // 404 for FCM AES128GCM
                if (e.statusCode === 410 || e.statusCode === 404) {
                    // delete invalid registration
                   return Subscription.remove({endpoint: sub.endpoint}).exec()
                        .then(function(sub) {
                            console.log('Deleted: ' + sub.endpoint);
                        })
                        .catch(function(sub) {
                            console.error('Failed to delete: ' + sub.endpoint);
                        });
                }
            });
        })
		.then(() => {
			console.log('Job executed correctly');
			res.status(200).json('job finished');
		});
    } catch (e) {
        console.log(e);
		res.status(500).json({
        error: e
      });
    }
};

init().catch(function(err) {
    console.error(err);
    process.exit(1);
});
	
};
