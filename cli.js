#!/usr/bin/env node

const { getMacOsNotifications } = require('./getNotifications');
const { pollForNewMacOsNotifications } = require('./pollNotifications');

(async () => {
  if (process.argv.includes('--poll')) {
    const interval = process.argv[process.argv.indexOf('--poll') + 1] || 1;
    console.log(`Polling for new notifications every ${interval} second${interval > 1 ? 's' : ''}`);
    pollForNewMacOsNotifications(console.log, interval && interval * 1000);
  } else {
    console.log(await getMacOsNotifications());
  }
})();
