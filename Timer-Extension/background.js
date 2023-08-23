chrome.alarms.create({
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get(["timer", "isRunning"], (result) => {
    const time = result.timer ?? 0;
    const isRunning = result.isRunning ?? true;
    if (!isRunning) {
      chrome.action.setBadgeText({
        text: "",
      });
      return;
    }
    chrome.storage.local.set({ timer: time + 1 });
    chrome.action.setBadgeText({
      text: `${time <= 59 ? time : Math.floor(time / 60) + "m"}`,
    });
    chrome.storage.sync.get(["notificationTime"], (result) => {
      const notificationTime = result.notificationTime ?? 10;
      if (time % (notificationTime * 60) === 0 && time !== 0) {
        this.registration.showNotification("S-Timer", {
          body: `${notificationTime} minutes has passed!`,
          icon: "icon.png",
        });
      }
    });
  });
});
