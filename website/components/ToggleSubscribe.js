import React, { Component, useEffect, useState } from 'react';
import Toggle from './Toggle';

import styles from './ToggleSubscribe.module.css';
import { Marked as marked } from './Marked.module.css';

const ToggleSubscribe = () => {
  let vapidDetails = {};
  process.browser &&
    (async () => {
      vapidDetails.public = (
        await (await fetch('/public_vapid.key')).text()
      ).trim();
    })();

  const [currentError, setCurrentError] = useState(null);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setSubscribed(localStorage.getItem('subscription') == 'true');
  }, []);

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
      if (!subscribed) {
        //subscribe

        if (Notification.permission === 'denied')
          return fail('Notification permission denied by user');

        try {
          const register = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
          });

          //https://stackoverflow.com/questions/39624676/uncaught-in-promise-domexception-subscription-failed-no-active-service-work/39673915
          await new Promise((resolve) => setTimeout(resolve, 100)); // wait for service worker to activate (breaks on Chromium Edge otherwise)
          if (!register.active)
            return fail(
              'Registered service worker but worker was not activated'
            );

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
              return fail('Subscription API failed to register subscription');
          } catch (e) {
            return fail('Failed to call subscription API');
          }
        } catch (e) {
          return fail('Failed to register service worker');
        }

        subscribed = !subscribed;
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

        subscribed = !subscribed;
      }
    } else return fail('Service workers not supported');

    localStorage.setItem('subscription', subscribed ? 'true' : 'false');
    setSubscribed(subscribed);
    setCurrentError(null);
  };

  // https://stackoverflow.com/questions/68424114/next-js-how-to-fetch-localstorage-data-before-client-side-rendering
  // see Toggle.js

  return (
    <div className={styles.ToggleSubscribe}>
      <div className={styles.toggleContainer}>
        <Toggle onClick={toggleOnClick} active={subscribed} />
        {currentError && (
          <div className={styles.errorContainer + ' ' + marked}>
            <p>
              An error occurred while subscribing to notifications. Please try
              again later.
            </p>
            <p>
              <strong>Error Code</strong> {currentError}
            </p>
          </div>
        )}
        {!currentError &&
          (subscribed
            ? "You'll receive notifications when new projects are published"
            : 'Stay Updated')}
      </div>
    </div>
  );
};

export default ToggleSubscribe;
