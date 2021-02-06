const { getMacOsNotifications } = require('./getNotifications');

const pollForNewMacOsNotifications = (callback, interval = 1000) => {
  const sendNotificationsToCallback = async () => {
    const notifications = await getMacOsNotifications(new Date().getTime() - (interval + 5000));
    if (notifications.length) {
      callback(notifications);
    }
  };

  sendNotificationsToCallback();
  return setInterval(sendNotificationsToCallback, interval);
};

module.exports = { pollForNewMacOsNotifications };
