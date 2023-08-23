const nameInput = document.getElementById("name-input");
const timeInput = document.getElementById("time-input");
const saveBtn = document.getElementById("save-btn");

saveBtn.addEventListener("click", () => {
  const name = nameInput.value;
  const notificationTime = timeInput.value;
  chrome.storage.sync.set({ name, notificationTime });
});

chrome.storage.sync.get(["name", "notificationTime"], (result) => {
  nameInput.value = result.name ?? "User";
  timeInput.value = result.notificationTime ?? 10;
});
