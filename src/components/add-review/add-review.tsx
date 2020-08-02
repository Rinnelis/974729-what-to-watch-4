import * as React from "react";
import {connect} from "react-redux";
import {ValidReview} from "../../const";
import Header from "../header/header";
import {getReviewStatus} from "../../reducer/data/selectors";
import history from "../../history";

interface Props {
  chosenMovie: {
    bgImage: string;
    title: string;
    poster: string;
    bgColor: string;
  };
  isSendingReview: {
    isSendingReview: boolean;
    sendReviewError: boolean;
    sendReviewSuccess: boolean;
  };
  comment: boolean|string;
  rating: boolean|string;
  onReviewWrite: ({target}: {target: EventTarget|null}) => void;
  onRatingChange: ({target}: {target: EventTarget|null}) => void;
  onReviewSubmit: (evt: React.FormEvent<HTMLFormElement>) => void;
}

const AddReview: React.FunctionComponent<Props> = (props: Props) => {
  const {
    chosenMovie,
    isSendingReview,
    comment,
    rating,
    onReviewWrite,
    onRatingChange,
    onReviewSubmit,
  } = props;
  const {bgImage, title, poster, bgColor} = chosenMovie;

  const isReviewValid = (rating && comment) ? false : true;

  if (isSendingReview.sendReviewSuccess) {
    history.goBack();
  }

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
    <section className="movie-card movie-card--full" style={/* stylelint-disable-line */{backgroundColor: bgColor}}>
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={bgImage} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header
          chosenMovie={chosenMovie}
        />

        <div className="movie-card__poster movie-card__poster--small">
          <img src={poster} alt={title} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form action="#"
          className="add-review__form"
          onSubmit={onReviewSubmit}
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

const mapStateToProps = (state) => ({
  isSendingReview: getReviewStatus(state),
});

export default connect(mapStateToProps)(AddReview);
