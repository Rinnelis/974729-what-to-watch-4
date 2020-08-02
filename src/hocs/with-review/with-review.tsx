import * as React from "react";
import {Subtract} from "utility-types";
import {connect} from "react-redux";
import {Film} from "../../types";
import {getFilmById} from "../../reducer/data/selectors";
import {MIN_RATING} from "../../const";
import {Operation} from "../../reducer/data/data";

interface Props {
  chosenMovie: Film;
  onReviewSubmit: (number, {}) => void;
  loadFilms: () => void;
}

interface State {
  rating: string;
  comment: boolean;
}

interface InjectedProps {
  rating: number;
  comment: boolean;
  handleReviewWrite: (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleRatingChange: (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleReviewSubmit: (evt: React.FormEvent<HTMLFormElement>) => void;
}

const withReview = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithReview extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        rating: MIN_RATING,
        comment: false,
      };

      this._handleReviewWrite = this._handleReviewWrite.bind(this);
      this._handleRatingChange = this._handleRatingChange.bind(this);
      this._handleReviewSubmit = this._handleReviewSubmit.bind(this);
    }

    componentDidMount() {
      const {loadFilms} = this.props;
      loadFilms();
    }

    _handleReviewWrite(evt) {
      const comment = evt.target.value;
      const newState = {comment} as Pick<State, keyof State>;
      this.setState(newState);
    }

    _handleRatingChange(evt) {
      const rating = evt.target.value;
      const newState = {rating} as Pick<State, keyof State>;
      this.setState(newState);
    }

    _handleReviewSubmit(evt) {
      const {chosenMovie, onReviewSubmit} = this.props;
      const {rating, comment} = this.state;
      evt.preventDefault();

      onReviewSubmit(chosenMovie.id, {
        rating,
        comment,
      });
    }

    render() {
      const {rating, comment} = this.state;

      return <Component
        {...this.props}
        rating={rating}
        comment={comment}
        onReviewWrite={this._handleReviewWrite}
        onRatingChange={this._handleRatingChange}
        onReviewSubmit={this._handleReviewSubmit}
      />;
    }
  }

  const mapStateToProps = (state, props) => ({
    chosenMovie: getFilmById(state, props.movieID),
  });

  const mapDispatchToProps = (dispatch) => ({
    onReviewSubmit(comment, id) {
      dispatch(Operation.sendReview(comment, id));
    },
    loadFilms() {
      dispatch(Operation.loadFilms());
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithReview);
};

export default withReview;
