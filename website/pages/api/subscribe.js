import { promises as fs } from 'fs';
import { setFlagsFromString } from 'v8';
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

  const lastPostMap = await getLastPostMap();
  const postMap = (await import('../../private/lib/postMap')).default;

  if (postMap[0] != lastPostMap[0]) {
    await setLastPostMap(postMap);

    const info = JSON.parse(
      await fs.readFile(process.cwd() + '/public/' + postMap[0] + '/index.json')
    );

    sendNotification({
      title: `New Post: ${info.title}`,
      body: info.desc,
      icon: `/icon.png`,
      id: postMap[0],
    });
  }
};

const readJSON = async (path) => {
  //https://stackoverflow.com/questions/12899061/creating-a-file-only-if-it-doesnt-exist-in-node-js
  await fs.writeFile(`${process.cwd()}/${path}`, '', {
    flag: 'a+',
  });

  return JSON.parse(
    (await fs.readFile(`${process.cwd()}/${path}`)).toString() || '{}'
  );
};

const setJSON = async (path, data) => {
  //https://stackoverflow.com/questions/12899061/creating-a-file-only-if-it-doesnt-exist-in-node-js
  await fs.writeFile(`${process.cwd()}/${path}`, '', {
    flag: 'a+',
  });

  fs.writeFile(
    `${process.cwd()}/${path}`,
    JSON.stringify(data),
    { flag: 'w' },
    (err) => {
      if (err) console.log(err);
    }
  );
};

const getLastPostMap = async () => {
  return await readJSON('private/lib/lastPostMap.json');
};

const setLastPostMap = async (data) => {
  return await setJSON('private/lib/lastPostMap.json', data);
};

const getSubscriptions = async () => {
  return await readJSON('private/subscriptions.json');
};

const setSusbscriptions = async (data) => {
  await setJSON('private/subscriptions.json', data);
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
