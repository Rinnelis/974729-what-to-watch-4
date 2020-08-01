import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ProjectPropTypes} from "../../project-prop-types.js";
import {getFilmById} from "../../reducer/data/selectors.js";
import {MIN_RATING} from "../../const.js";
import {Operation} from "../../reducer/data/data.js";

const withReview = (Component) => {
  class WithReview extends PureComponent {
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

    _handleReviewWrite(evt) {
      const comment = evt.target.value;

      this.setState({
        comment,
      });
    }

    _handleRatingChange(evt) {
      const rating = evt.target.value;

      this.setState({
        rating,
      });
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

    componentDidMount() {
      const {loadFilms} = this.props;
      loadFilms();
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

  WithReview.propTypes = {
    chosenMovie: PropTypes.oneOfType([
      ProjectPropTypes.FILM,
      PropTypes.bool,
    ]),
    onReviewSubmit: PropTypes.func.isRequired,
    loadFilms: PropTypes.func.isRequired,
  };

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
