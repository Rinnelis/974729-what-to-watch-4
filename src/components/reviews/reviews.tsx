import * as React from "react";
import {connect} from "react-redux";
import {Film, Comments} from "../../types";
import {Operation} from "../../reducer/data/data";
import {getFilmComments, getCommentsStatus} from "../../reducer/data/selectors";
import {getRatingScore} from "../../utils";
import {REVIEWS_COL_AMOUNT} from "../../const";

interface Props {
  comments: {
    id: number,
    user: {
      id: number,
      name: string,
    },
    rating: number,
    comment: string,
    date: string,
  }[];
  isLoadingComments: {
    isLoadingComments: boolean;
    loadCommentsError: boolean;
  };
  loadComments: (object) => object[];
  chosenMovie: Film|boolean;
}

class Reviews extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {loadComments, chosenMovie} = this.props;
    loadComments(chosenMovie);
  }

  componentDidUpdate(nextProps) {
    const {loadComments, chosenMovie} = this.props;
    if (nextProps.chosenMovie !== chosenMovie) {
      loadComments(chosenMovie);
    }
  }

  render() {
    const {comments, isLoadingComments} = this.props;
    const halfOfReviews = comments && Math.round(comments.length / REVIEWS_COL_AMOUNT);
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
                  <p className="review__text" style={{overflow: `hidden`, textOverflow: `ellipsis`}}>
                    {comment.comment}
                  </p>
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
  }
}

const mapStateToProps = (state) => ({
  comments: getFilmComments(state),
  isLoadingComments: getCommentsStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadComments(film) {
    dispatch(Operation.loadComments(film.id));
  },
});

export {Reviews};
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
