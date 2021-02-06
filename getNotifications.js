const { execSync } = require('child_process');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const bplist = require('bplist-parser');

const appleUnixEpochDiff = 978307200;

let database;

const getDbConnection = async () => {
  if (database) {
    return database;
  }

  const notificationDir = execSync(
    "lsof -p $(ps aux | grep -m1 usernoted | awk '{ print $2 }')| awk '{ print $NF }' | grep 'db2/db$' | xargs dirname"
  )
    .toString()
    .trim();

  database = await open({
    filename: `${notificationDir}/db`,
    driver: sqlite3.Database,
  });

  return database;
};

const getMacOsNotifications = async (since) => {
  const db = await getDbConnection();

  let results;
  let query = 'SELECT data FROM record';
  if (since) {
    const deliveredAfter = since / 1000 - appleUnixEpochDiff;
    query = `${query} WHERE delivered_date >= $1`;
    results = await db.all(query, [deliveredAfter]);
  } else {
    results = await db.all(query);
  }

  return results
    .map(({ data }) => bplist.parseBuffer(data))
    .flat()
    .map((notification) => ({
      date: new Date((notification.date + appleUnixEpochDiff) * 1000),
      app: notification.app,
      title: notification.req.titl,
      subtitle: notification.req?.subt,
      body: notification.req?.body,
      style: notification.styl,
    }));
};

module.exports = { getMacOsNotifications };
