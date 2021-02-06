const { getMacOsNotifications } = require('./getNotifications');
const { pollForNewMacOsNotifications } = require('./pollNotifications');

module.exports = { getMacOsNotifications, pollForNewMacOsNotifications };
