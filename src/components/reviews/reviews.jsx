import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getFilmComments, getCommentsStatus} from "../../reducer/data/selectors.js";

const getRatingScore = (score) => {
  return score.toFixed(1).toString().replace(`.`, `,`);
};

const Reviews = (props) => {
  const {comments, isLoadingComments} = props;
  const halfOfReviews = comments && Math.round(comments.length / 2);
  const col1 = comments && comments.slice(0, halfOfReviews);
  const col2 = comments && comments.slice(halfOfReviews);

  const getCommentsMsg = () => {
    if (isLoadingComments.isLoadingComments && !isLoadingComments.loadCommentsError) {
      return `Comments are loading...`;
    } else if (isLoadingComments.isLoadingComments && isLoadingComments.loadCommentsError) {
      return `Server error occurred, please try again later`;
    }

    return false;
  };

  const getReviews = (movieComments) => {
    return (
      <div className="movie-card__reviews-col">
        {comments && movieComments.map((comment) => {
          const date = new Date(comment.date);

          return (
            <div key={comment.id} className="review">
              <blockquote className="review__quote">
                <p className="review__text">{comment.comment}</p>
                <footer className="review__details">
                  <cite className="review__author">{comment.user.name}</cite>
                  <time className="review__date" dateTime={date.toISOString()}>{
                    date.toLocaleDateString(`en-US`, {month: `long`, day: `numeric`, year: `numeric`})
                  }</time>
                </footer>
              </blockquote>
              <div className="review__rating">{getRatingScore(comment.rating)}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <React.Fragment>
      {getCommentsMsg() ||
    <div className="movie-card__reviews movie-card__row">
      {getReviews(col1)}
      {getReviews(col2)}
    </div>
      }
    </React.Fragment>
  );
};

Reviews.propTypes = {
  comments: PropTypes.PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.bool,
  ]),
  isLoadingComments: PropTypes.shape({
    isLoadingComments: PropTypes.bool.isRequired,
    loadCommentsError: PropTypes.bool.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  comments: getFilmComments(state),
  isLoadingComments: getCommentsStatus(state),
});

export default connect(mapStateToProps)(Reviews);
