import React, { Component } from 'react';
import Toggle from './Toggle';

import styles from './ToggleSubscribe.module.css';

const ToggleSubscribe = () => {
  vapidDetails = {};
  (async () => {
    vapidDetails.public = (
      await (await fetch('/public_vapid.key')).text()
    ).trim();
  })();

  const toggleOnClick = async ([isActive, setActive], e) => {
    isActive = !isActive;

    //https://pusher.com/tutorials/push-notifications-node-service-workers
    const urlBase64ToUint8Array = (base64String) => {
      const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i)
        outputArray[i] = rawData.charCodeAt(i);
      return outputArray;
    };

    if (isActive) {
      //subscribe
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/sw.js', {
            scope: '/',
          })
          .then(async (register) => {
            //https://stackoverflow.com/questions/39624676/uncaught-in-promise-domexception-subscription-failed-no-active-service-work/39673915
            if (!register.active) return;
            const subscription = await register.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(vapidDetails.public),
            });
            await fetch('/api/subscribe/', {
              method: 'POST',
              body: JSON.stringify(subscription),
            });
          });
      } else {
        //unsubscribe
        if ('serviceWorker' in navigator) {
          //https://love2dev.com/blog/how-to-uninstall-a-service-worker/
          const registrations = await navigator.serviceWorker.getRegistrations();
          registrations[0].unregister();
        }
      }
    }

    localStorage.setItem('subscription', isActive ? 'true' : 'false');
    setActive(isActive);
  };

  return (
    <div className={styles.ToggleSubscribe}>
      <Toggle
        onClick={toggleOnClick}
        active={localStorage.getItem('subscription') == 'true'}
      />
      <span></span>
      Receive Notifications
    </div>
  );
};

export default ToggleSubscribe;
