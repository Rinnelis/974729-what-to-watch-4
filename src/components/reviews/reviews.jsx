import React from "react";
import PropTypes from "prop-types";
import {v4 as uuidv4} from "uuid";

const getRatingScore = (score) => {
  return score.toFixed(1).toString().replace(`.`, `,`);
};

const Reviews = (props) => {
  const {film} = props;
  const {reviews} = film;

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {
          reviews.slice(0, 3).map((review) => {
            const date = new Date(review.date);

            return (
              <div key={uuidv4()} className="review">
                <blockquote className="review__quote">
                  <p className="review__text">{review.text}</p>
                  <footer className="review__details">
                    <cite className="review__author">{review.author}</cite>
                    <time className="review__date" dateTime={date.toISOString()}>{
                      date.toLocaleDateString(`en-US`, {month: `long`, day: `numeric`, year: `numeric`})
                    }</time>
                  </footer>
                </blockquote>
                <div className="review__rating">{getRatingScore(review.score)}</div>
              </div>
            );
          })
        }
      </div>
      <div className="movie-card__reviews-col">
        {
          reviews.slice(3, 5).map((review) => {
            const date = new Date(review.date);

            return (
              <div key={uuidv4()} className="review">
                <blockquote className="review__quote">
                  <p className="review__text">{review.text}</p>
                  <footer className="review__details">
                    <cite className="review__author">{review.author}</cite>
                    <time className="review__date" dateTime={date.toISOString()}>{
                      date.toLocaleDateString(`en-US`, {month: `long`, day: `numeric`, year: `numeric`})
                    }</time>
                  </footer>
                </blockquote>
                <div className="review__rating">{getRatingScore(review.score)}</div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

Reviews.propTypes = {
  film: PropTypes.shape({
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
          author: PropTypes.string.isRequired,
          score: PropTypes.number.isRequired,
          text: PropTypes.string.isRequired,
          date: PropTypes.number.isRequired,
        }).isRequired
    ).isRequired,
  }).isRequired,
};

export default Reviews;
