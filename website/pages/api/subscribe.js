import { promises as fs, constants } from 'fs';
import webPush from 'web-push';

var webPushInit = async () => {
  var vapidDetails = {
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
var checkSubscriptions = async () => {
  var sendNotification = async (data) => {
    var subscriptions = await getSubscriptions();
    var payload = JSON.stringify(data);

    for (var key of Object.keys(subscriptions))
      webPush.sendNotification(subscriptions[key], payload).catch((err) => {
        //console.log(err);
      });
  };

  //https://nextjs.org/docs/advanced-features/dynamic-import
  var pageMap = (await import('../../private/api/pageMap')).default;
  var lastPageMap = (await import('../../private/api/lastPageMap')).default;

  if (pageMap[0] != lastPageMap[0]) {
    //https://www.geeksforgeeks.org/node-js-fs-copyfile-function/
    fs.copyFile(
      process.cwd() + '/private/api/pageMap.js',
      process.cwd() + '/private/api/lastPageMap.js',
      constants.COPYFILE_FICLONE
    );
    var info = JSON.parse(
      await fs.readFile(process.cwd() + '/public/' + pageMap[0] + '/index.json')
    );
    sendNotification({
      title: 'New Post: ' + info.title,
      body: info.desc,
      icon: '/icon.png',
      click_action: 'https://google.com/',
      tag: pageMap[0],
    });
  }
};

var getSubscriptions = async () => {
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

var setSusbscriptions = async (subscriptions) => {
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
  await checkSubscriptions();

  var subscription = JSON.parse(req.body);
  var subscriptions = await getSubscriptions();
  subscriptions[subscription.keys.auth] = subscription;
  setSusbscriptions(subscriptions);

  res.status(201).json({});
}
