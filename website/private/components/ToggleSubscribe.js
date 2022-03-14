import React, { Component, useEffect, useState } from 'react';
import Toggle from './Toggle';

import styles from './ToggleSubscribe.module.css';
import { Marked as marked } from './Marked.module.css';

const ToggleSubscribe = () => {
  var vapidDetails = {};
  process.browser &&
    (async () => {
      vapidDetails.public = (
        await (await fetch('/public_vapid.key')).text()
      ).trim();
    })();

  const [currentError, setCurrentError] = useState(null);

  const fail = (err) => {
    setCurrentError(err);
  };

  const toggleOnClick = async ([isActive, setActive], e) => {
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

    if ('serviceWorker' in navigator && 'Notification' in window) {
      if (!isActive) {
        //subscribe

        if (Notification.permission === 'denied')
          return fail('Notification permission denied');

        try {
          const register = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
          });

          //https://stackoverflow.com/questions/39624676/uncaught-in-promise-domexception-subscription-failed-no-active-service-work/39673915
          await new Promise((resolve) => setTimeout(resolve, 100)); // wait for service worker to activate (breaks on Chromium Edge otherwise)
          if (!register.active)
            return fail('Registered service worker but did not activate');

          const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(vapidDetails.public),
          });

          try {
            const response = await fetch('/api/subscribe/', {
              method: 'POST',
              body: JSON.stringify(subscription),
            });

            if (!response.ok)
              return fail('Subscribe API failed to register subscription');
          } catch (e) {
            return fail('Failed to call subscribe API');
          }
        } catch (e) {
          return fail('Failed to register service worker');
        }

        isActive = !isActive;
      } else {
        //unsubscribe

        try {
          //https://love2dev.com/blog/how-to-uninstall-a-service-worker/
          const registrations =
            await navigator.serviceWorker.getRegistrations();
          for (const registration of registrations)
            await registration.unregister();
        } catch (e) {
          fail('Failed to unregister service worker');
        }

        isActive = !isActive;
      }
    } else return fail('Service workers not supported');

    localStorage.setItem('subscription', isActive ? 'true' : 'false');
    setActive(isActive);
    setCurrentError(null);
  };

  // https://stackoverflow.com/questions/68424114/next-js-how-to-fetch-localstorage-data-before-client-side-rendering
  // see Toggle.js

  return (
    <div className={styles.ToggleSubscribe}>
      <div className={styles.toggleContainer}>
        <Toggle
          onClick={toggleOnClick}
          active={
            process.browser && localStorage.getItem('subscription') == 'true'
          }
        />
        {currentError && (
          <div className={styles.errorContainer}>
            An error occurred while subscribing to notifications. Please try
            again later. <br />
            Error Code: <code className={marked}>{currentError}</code>
          </div>
        )}
        {!currentError && 'Receive Notifications'}
      </div>
    </div>
  );
};

export default ToggleSubscribe;
