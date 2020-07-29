import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ProjectPropTypes} from "../../project-prop-types.js";
import {ValidReview} from "../../const.js";
import Header from "../header/header.jsx";
import {getReviewStatus} from "../../reducer/data/selectors.js";

const AddReview = (props) => {
  const {
    film,
    isSendingReview,
    review,
    rating,
    onReviewWrite,
    onRatingChange,
    onReviewSubmit,
    onSignInClick
  } = props;
  const {bgImage, title, poster} = film;

  const isReviewValid = (rating && review) ? false : true;

  const getReviewMsg = () => {
    if (isSendingReview.isSendingReview && !isSendingReview.sendReviewError) {
      return ``;
    } else if (isSendingReview.isSendingReview && isSendingReview.sendReviewError) {
      return `Review's sending wasn't successful, please try again later`;
    }

    return false;
  };

  const isFormBlocked = (isSendingReview.isSendingReview && !isSendingReview.sendReviewError) ? true : false;

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={bgImage} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header
          film={film}
          onSignInClick={onSignInClick}
        />

        <div className="movie-card__poster movie-card__poster--small">
          <img src={poster} alt={title} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form action="#"
          className="add-review__form"
          onSubmit={onReviewSubmit}
          disabled={isFormBlocked}
        >
          <div className="rating">
            <div className="rating__stars" onChange={onRatingChange}>
              <input className="rating__input" id="star-1" type="radio" name="rating" value="1" disabled={isFormBlocked}/>
              <label className="rating__label" htmlFor="star-1">Rating 1</label>

              <input className="rating__input" id="star-2" type="radio" name="rating" value="2" disabled={isFormBlocked}/>
              <label className="rating__label" htmlFor="star-2">Rating 2</label>

              <input className="rating__input" id="star-3" type="radio" name="rating" value="3" disabled={isFormBlocked}/>
              <label className="rating__label" htmlFor="star-3">Rating 3</label>

              <input className="rating__input" id="star-4" type="radio" name="rating" value="4" disabled={isFormBlocked}/>
              <label className="rating__label" htmlFor="star-4">Rating 4</label>

              <input className="rating__input" id="star-5" type="radio" name="rating" value="5" disabled={isFormBlocked}/>
              <label className="rating__label" htmlFor="star-5">Rating 5</label>
            </div>
          </div>

          <div className="add-review__text">
            <textarea
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              minLength={ValidReview.MIN}
              maxLength={ValidReview.MAX}
              onInput={onReviewWrite}
              disabled={isFormBlocked}
            ></textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit" disabled={isReviewValid || isFormBlocked}>Post</button>
            </div>
          </div>
          {getReviewMsg()}
        </form>
      </div>
    </section>
  );
};

AddReview.propTypes = {
  film: ProjectPropTypes.FILM.isRequired,
  onReviewSubmit: PropTypes.func.isRequired,
  isSendingReview: PropTypes.shape({
    isSendingReview: PropTypes.bool.isRequired,
    sendReviewError: PropTypes.bool.isRequired,
  }),
  review: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  rating: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  onReviewWrite: PropTypes.func.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onSignInClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isSendingReview: getReviewStatus(state),
});

export default connect(mapStateToProps)(AddReview);
