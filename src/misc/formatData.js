const formatTimeString = (hours, minutes, seconds) => {
  return `0${hours}:${
    minutes.toString().length === 1 ? `0${minutes}` : minutes
  }:${seconds.toString().length === 1 ? `0${seconds}` : seconds}`;
};

export { formatTimeString };
