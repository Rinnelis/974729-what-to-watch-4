import React from "react";
import PropTypes from "prop-types";
import {v4 as uuidv4} from "uuid";

const getRatingScore = (score) => {
  return score.toFixed(1).toString().replace(`.`, `,`);
};

const Reviews = (props) => {
  const {reviews} = props;
  const halfOfReviews = reviews && Math.round(reviews.length / 2);
  const col1 = reviews && reviews.slice(0, halfOfReviews);
  const col2 = reviews && reviews.slice(halfOfReviews);

  const getReviews = (movieReviews) => {
    return (
      <div className="movie-card__reviews-col">
        {reviews && movieReviews.map((review) => {
          const date = new Date(review.date);

          return (
            <div key={uuidv4()} className="review">
              <blockquote className="review__quote">
                <p className="review__text">{review.comment}</p>
                <footer className="review__details">
                  <cite className="review__author">{review.user.name}</cite>
                  <time className="review__date" dateTime={date.toISOString()}>{
                    date.toLocaleDateString(`en-US`, {month: `long`, day: `numeric`, year: `numeric`})
                  }</time>
                </footer>
              </blockquote>
              <div className="review__rating">{getRatingScore(review.rating)}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="movie-card__reviews movie-card__row">
      {getReviews(col1)}
      {getReviews(col2)}
    </div>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.bool,
  ]),
};

export default Reviews;
