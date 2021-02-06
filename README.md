# get-macos-notifications

Returns an array of missed macOS notification banners.

**Note:** currently only works for **missed** notification **banners** that have been displayed, but not interacted with. E.g. have not been closed/dismissed or actioned by the user and that have disappeared by themselves.

**Works on:** macOS 10.14 and higher.

## Usage

### CLI

`npx get-macos-notifications`

Poll for new notifications (interval in seconds):  
`npx get-macos-notifications --poll 2`

### Importing

`npm install --save get-macos-notifications`

```js
const { getMacOsNotifications, pollForNewMacOsNotifications } = require('get-macos-notifications');

(async () => {
  // Returns an array of notifications
  console.log(await getMacOsNotifications());

  // Example: polling for new notifications (callback, polling interval in milliseconds)
  pollForNewMacOsNotifications(
    (notifications) =>
      notifications.map(({ app, title, subtitle = '', body = '' }) => {
        console.log({ app, title, subtitle, body });
        const safe = (str) => str.replace(/"|\\/g, '');
        require('child_process').exec(`say "${safe(title)} ${safe(body)}"`);
      }),
    2000
  );
})();
```

### Example response

```js
[
  {
    date: 2021-02-06T20:35:03.384Z,
    app: 'com.google.Chrome',
    title: 'Hello World',
    subtitle: 'calendar.google.com',
    body: '20:50 – 21:55',
    style: 1
  }
]
```
