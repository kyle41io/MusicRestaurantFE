export const range = (start, end) => {
  let length = end - start;

  return Array.from({ length }, (_, idx) => idx + start);
};

export const formatTime = (time) => {
  if (time && !isNaN(time)) {
    const minutes = Math.floor(time / 60);
    const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(time % 60);
    const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formatMinutes}:${formatSeconds}`;
  }
  return "00:00";
};

export const getBackgroundSize = (value, MAX) => {
  return { backgroundSize: `${(value * MAX) / MAX}% 100%` };
};

export const options = ["Newest", "Oldest"];
