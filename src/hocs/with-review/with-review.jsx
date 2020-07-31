import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ProjectPropTypes} from "../../project-prop-types.js";
import {getChosenMovie} from "../../reducer/movies/selectors.js";
import {Operation} from "../../reducer/data/data.js";

const withReview = (Component) => {
  class WithReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: false,
        review: false,
      };

      this._handleReviewWrite = this._handleReviewWrite.bind(this);
      this._handleRatingChange = this._handleRatingChange.bind(this);
      this._handleReviewSubmit = this._handleReviewSubmit.bind(this);
    }

    _handleReviewWrite(evt) {
      const review = evt.target.value;

      this.setState({
        review,
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
      const {rating, review} = this.state;
      evt.preventDefault();

      onReviewSubmit(chosenMovie.id, {
        rating,
        review,
      });
    }

    render() {
      const {rating, review} = this.state;

      return <Component
        {...this.props}
        rating={rating}
        review={review}
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
  };

  const mapStateToProps = (state) => ({
    chosenMovie: getChosenMovie(state),
  });

  const mapDispatchToProps = (dispatch) => ({
    onReviewSubmit(review, id) {
      dispatch(Operation.sendReview(review, id));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithReview);
};

export default withReview;
