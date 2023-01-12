self.addEventListener('push', (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, data);
});

//https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/notificationclick_event
// https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications
self.onnotificationclick = function (event) {
  const { data } = event.notification;

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
      })
      .then(function (clientList) {
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url == '/' + data.id + '/' && 'focus' in client)
            return client.focus();
        }
        if (clients.openWindow) return clients.openWindow('/' + data.id + '/');
      })
  );
};
