const publicVapidKey = '';

if ('serviceWorker' in navigator) {
	var Notification = window.Notification || window.mozNotification || window.webkitNotification;

	var was_questioned = false;
	if (Notification.permission == 'default') {
		was_questioned = true;
	}

	Notification.requestPermission(function (permission) {
	// permission types: granted, denied, prompt, default
		if (was_questioned) {
			console.log("User was asked. New permission is: " + permission);
			if (permission == 'granted') {
				navigator.serviceWorker.getRegistrations().then(registrations => {
					if (!registrations[0]) {
						registerSW();
					} else {
						postSubscriberData();
					}
				});
			}
		}
		if ('permissions' in navigator) {
		navigator.permissions.query({name:'notifications'}).then(function(notificationPerm) {
			notificationPerm.onchange = function() {
				console.log("User decided to change his seettings. New permission: " + notificationPerm.state);
			};
		});
		}
	});	
} else {
	console.log('Service workers are not supported.');
}


function registerSW() {
	console.log('Registering service worker');
	navigator.serviceWorker.register('worker.js', {
		scope: './'
	}).then(function(registration) {
		console.log('Service worker registered successfully');
		postSubscriberData();
	}).catch(function(err) {
		console.log('Service worker registration failed:', error);
	});
}


function postSubscriberData() {
		navigator.serviceWorker.ready.then(registration => {
		console.log('Service worker ready');
			registration.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
			}).then(function(sub) {
				console.log('Subscription sent to the server');
				 fetch('/subscribe', {
					method: 'POST',
					body: JSON.stringify(sub),
					headers: {
						'content-type': 'application/json'
					}
				})
				.then(function(response) {
					console.log(response);
					console.log('Closing window...');
					window.close();
				})
				.catch(function(error) {
					console.log(error);
				});
			});
		});
}

// Boilerplate borrowed from https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}