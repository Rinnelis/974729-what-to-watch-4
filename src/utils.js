import {Time, RatingNumber, RatingLevel} from "./const.js";

export const noop = () => {
  // do nothing
};

export const getStarring = (actors) => {
  return actors.join(`, `);
};

export const getHours = (time) => {
  const hours = Math.trunc(time / Time.MINUTES_PER_HOUR);
  return hours > 0 ? `${hours}h` : ``;
};

export const getMinutes = (time) => {
  const minutes = time % Time.SECONDS_PER_MINUTE;
  return minutes > 0 ? `${minutes}m` : ``;
};

export const getRatingLevel = (count) => {
  let ratingLevel = ``;
  if (count < RatingNumber.BAD) {
    ratingLevel = RatingLevel.BAD;
  } else if (count >= RatingNumber.BAD && count < RatingNumber.NORMAL) {
    ratingLevel = RatingLevel.NORMAL;
  } else if (count >= RatingNumber.NORMAL && count < RatingNumber.GOOD) {
    ratingLevel = RatingLevel.GOOD;
  } else if (count >= RatingNumber.GOOD && count < RatingNumber.VERY_GOOD) {
    ratingLevel = RatingLevel.VERY_GOOD;
  } else {
    ratingLevel = RatingLevel.AWESOME;
  }
  return ratingLevel;
};

export const getOverviewStarring = (actors) => {
  return actors.slice(0, 4).join(`, `);
};

export const getRatingScore = (score) => {
  return score.toFixed(1).toString().replace(`.`, `,`);
};

export const extend = (prevState, newState) => {
  return Object.assign({}, prevState, newState);
};
