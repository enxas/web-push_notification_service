## Requirements

NodeJS v10

MongoDB v3.6

NPM v6

Domain with HTTPS protocol

## Setup

Upload project to a server with HTTPS domain.

Go to projects directory:

`cd /web-push_notification_service`

Install dependancies:

`npm install`

Paste following script just before </head> tag at the website where you want to implement push notifications. Works with HTTP and HTTPS.

`
<script>
    (function() {
        var script = document.createElement("script")
        script.type = "text/javascript";
        script.onload = function() {
            zo.notification();
        };
        script.async = 1;
        script.src = 'https://webpush.domain.com/js/notification.js';
        document.getElementsByTagName("head")[0].appendChild(script);
    })();
</script>
`

Replace "webpush.domain.com" with at mentioned script with your HTTPS domain. Also change "webpush.domain.com" in /public/js/notification.js

Enter your MongoDB credentials in index.js, at "mongoose.connect()" line

Use command `./node_modules/.bin/web-push generate-vapid-keys` to generate Public and Private VAPID keys. More info here https://github.com/web-push-libs/web-push. Enter your generated VAPID keys in controllers/subscription.js and Public key to public/js/client.js file

Start project:

`node index.js`

Server will start at address https://localhost:3001

## Usage

In "public" folderthere are 2 html files index.html and dashboard.html. index.html is for showing actual browsers subscription notification and dashboard.html is for sending notifications for subscribed users. These 2 files will be accessible when you start the project.

Visit a domain where you implemented script code mentioned in Setup section and you will see something like this: https://i.imgur.com/e5jE8rX.png. To send notifications to subscribed users visit https://yourdomain.com/dashboard.html and you should see something like this: https://i.imgur.com/YCzBfQx.png

## Resources

https://thecodebarbarian.com/sending-web-push-notifications-from-node-js.html

https://www.sitepoint.com/how-to-use-push-notifications-for-web-applications

https://webpushdemo.azurewebsites.net

https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications

https://www.djamware.com/post/5a593bfc80aca7059c142975/setup-nodejs-nginx-and-mongodb-on-ubuntu-1604-for-production