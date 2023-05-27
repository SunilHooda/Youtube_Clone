export const timeSince = (date: Date) => {
  const sec = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);

  let interval = sec / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years";
  }

  interval = sec / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }

  interval = sec / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }

  interval = sec / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }

  interval = sec / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }

  return Math.floor(sec) + " seconds";
};
