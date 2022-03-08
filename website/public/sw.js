self.addEventListener('push', (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, data);
});

//https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/notificationclick_event
self.onnotificationclick = function (event) {
  const { id } = event.notification;

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
      })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url == '/' + id + '/' && 'focus' in client)
            return client.focus();
        }
        if (clients.openWindow) return clients.openWindow('/' + id + '/');
      })
  );
};
