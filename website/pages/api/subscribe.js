import { promises as fs } from 'fs';
import webPush from 'web-push';

const webPushInit = async () => {
  const vapidDetails = {
    public: (await fs.readFile(process.cwd() + '/public/public_vapid.key'))
      .toString()
      .trim(),
    private: (await fs.readFile(process.cwd() + '/private/private_vapid.key'))
      .toString()
      .trim(),
  };

  webPush.setVapidDetails(
    'mailto:bricktech2000@gmail.com',
    vapidDetails.public,
    vapidDetails.private
  );
};

const checkSubscriptions = async () => {
  const sendNotification = async (data) => {
    const subscriptions = await getSubscriptions();
    const payload = JSON.stringify(data);

    for (var key of Object.keys(subscriptions))
      webPush.sendNotification(subscriptions[key], payload).catch((err) => {
        // console.log(err);
      });
  };

  //https://nextjs.org/docs/advanced-features/dynamic-import
  await fs.writeFile(process.cwd() + '/private/lib/lastPostMap.js', '', {
    flag: 'a+',
  });
  const postMap = (await import('../../private/lib/postMap')).default;
  const lastPostMap = (await import('../../private/lib/lastPostMap')).default;

  if (postMap[0] != lastPostMap[0]) {
    //https://www.geeksforgeeks.org/node-js-fs-copyfile-function/
    fs.copyFile(
      process.cwd() + '/private/lib/postMap.js',
      process.cwd() + '/private/lib/lastPostMap.js'
    );

    const info = JSON.parse(
      await fs.readFile(process.cwd() + '/public/' + postMap[0] + '/index.json')
    );

    console.log(info.title);
    sendNotification({
      title: `New Post: ${info.title}`,
      body: info.desc,
      icon: `/icon.png`,
      id: postMap[0],
    });
  }
};

const getSubscriptions = async () => {
  //https://stackoverflow.com/questions/12899061/creating-a-file-only-if-it-doesnt-exist-in-node-js
  await fs.writeFile(process.cwd() + '/private/subscriptions.json', '', {
    flag: 'a+',
  });

  return JSON.parse(
    (
      await fs.readFile(process.cwd() + '/private/subscriptions.json')
    ).toString() || '{}'
  );
};

const setSusbscriptions = async (subscriptions) => {
  //https://stackoverflow.com/questions/12899061/creating-a-file-only-if-it-doesnt-exist-in-node-js
  fs.writeFile(
    process.cwd() + '/private/subscriptions.json',
    JSON.stringify(subscriptions),
    { flag: 'w' },
    (err) => {
      if (err) console.log(err);
    }
  );
};

export default async function subscribe(req, res) {
  await webPushInit();

  try {
    const subscription = JSON.parse(req.body);
    const subscriptions = await getSubscriptions();
    subscriptions[subscription.keys.auth] = subscription;
    setSusbscriptions(subscriptions);

    res.status(201).json({});
  } catch (e) {
    res && res.status(500).json({});
  }

  await checkSubscriptions();
}
