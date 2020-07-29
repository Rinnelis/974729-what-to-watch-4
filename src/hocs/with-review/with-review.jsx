import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {ProjectPropTypes} from "../../project-prop-types.js";

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
      const {film, onReviewSubmit} = this.props;
      const {rating, review} = this.state;
      evt.preventDefault();

      onReviewSubmit(film.id, {
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
    film: ProjectPropTypes.FILM,
    onReviewSubmit: PropTypes.func.isRequired,
  };

  return WithReview;
};

export default withReview;
