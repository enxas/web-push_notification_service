console.log('Loaded service worker!');

let notification_url = '';
let offer_url = '';
let action1_title = '';
let hide_seconds = 99999;

self.addEventListener('push', function(event) {
	console.log('[Service Worker] Got push notification.');
	const data = event.data.json();
	notification_url = data.notification_url;
	hide_seconds = data.hide_sec;
	offer_url = data.offer_url;
	action1_title = data.action1_title;
	
	event.waitUntil(
		self.registration.showNotification(data.title, {
			body: data.message,
			icon: data.icon,
			actions: [  
				{action: 'claim', title: action1_title }
			] 
		})
		.then(() => self.registration.getNotifications())
		.then(notifications => {
			setTimeout(() => notifications.forEach(notification => notification.close()), hide_seconds * 1000);
		})
    );
});

self.addEventListener('notificationclick', function(event) {  
	event.notification.close();

	if (event.action === 'claim') {
		clients.openWindow(offer_url);  
	} else {  
		event.waitUntil(
			clients.openWindow(notification_url)
		);
	}  
}, false);
