const timeElement = document.getElementById("time");
const nameElement = document.getElementById("name");
const timerElement = document.getElementById("timer");

function updateTImeElements() {
  chrome.storage.local.get(["timer", "isRunning"], (result) => {
    const time = result.timer ?? 0;
    let minutes = Math.floor(time / 60);
    if (result.isRunning) {
      timerElement.textContent = `You have spent ${
        minutes === 0
          ? ""
          : minutes % 60 === 0 && minutes !== 0
          ? minutes / 60 + " hours"
          : minutes + (minutes === 1 ? " minute" : " minutes")
      } ${
        minutes % 60 === 0 && minutes !== 0
          ? minutes + " minutes"
          : time -
            minutes * 60 +
            (time - minutes * 60 === 1 ? " second" : " seconds")
      } on this site`;
    } else {
      timerElement.textContent = "";
    }
  });

  const currentTime = new Date().toLocaleTimeString();
  timeElement.textContent = `The time is ${currentTime}`;
}

updateTImeElements();
setInterval(updateTImeElements, 1000);

chrome.storage.sync.get(["name"], (result) => {
  const name = result.name ?? "User";
  nameElement.textContent = `Hello ${name}`;
});

const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");

startBtn.addEventListener("click", () => {
  chrome.storage.local.set({ isRunning: true });
});

stopBtn.addEventListener("click", () => {
  chrome.storage.local.set({ isRunning: false });
});

resetBtn.addEventListener("click", () => {
  chrome.storage.local.set({ isRunning: false, timer: 0 });
});
