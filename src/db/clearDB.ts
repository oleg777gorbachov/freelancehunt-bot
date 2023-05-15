import item from "../models/user";

setInterval(async () => {
  const items = await item.find();
  for (let key of items) {
    if (key.notified.length > 10) {
      const lastTen = key.notified.splice(
        key.notified.length - 10,
        key.notified.length
      );
      key.notified = lastTen;
      key.save();
    }
  }
}, 24 * 60 * 60 * 1000 * 5);
