import React, { Component, useEffect, useState } from 'react';
import Toggle from './Toggle';

import styles from './ToggleSubscribe.module.css';

const ToggleSubscribe = () => {
  var vapidDetails = {};
  process.browser &&
    (async () => {
      vapidDetails.public = (
        await (await fetch('/public_vapid.key')).text()
      ).trim();
    })();

  const fail = (err) => {
    console.error(err);
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

    if ('serviceWorker' in navigator) {
      if (!isActive) {
        //subscribe

        try {
          const register = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
          });

          //https://stackoverflow.com/questions/39624676/uncaught-in-promise-domexception-subscription-failed-no-active-service-work/39673915
          await new Promise((resolve) => setTimeout(resolve, 100)); // wait for service worker to activate (breaks on Chromium Edge otherwise)
          if (!register.active)
            return fail('Registered service worker but not active');

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
          registrations[0].unregister();
        } catch (e) {}

        isActive = !isActive;
      }
    } else return fail('Service workers not supported');

    localStorage.setItem('subscription', isActive ? 'true' : 'false');
    setActive(isActive);
  };

  // https://stackoverflow.com/questions/68424114/next-js-how-to-fetch-localstorage-data-before-client-side-rendering
  // see Toggle.js

  return (
    <div className={styles.ToggleSubscribe}>
      <Toggle
        onClick={toggleOnClick}
        active={
          process.browser && localStorage.getItem('subscription') == 'true'
        }
      />
      <span></span>
      Receive Notifications
    </div>
  );
};

export default ToggleSubscribe;
