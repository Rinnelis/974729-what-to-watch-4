import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ProjectPropTypes} from "../../project-prop-types.js";
import {MovieNav} from "../../const.js";
import Overview from "../../components/overview/overview.jsx";
import Details from "../../components/details/details.jsx";
import Reviews from "../../components/reviews/reviews.jsx";
import {getFilmById} from "../../reducer/data/selectors.js";

const withActiveTab = (Component) => {
  class WithActiveTab extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        currentTab: MovieNav.OVERVIEW,
      };

      this._handleTabClick = this._handleTabClick.bind(this);
      this._handleCurrentTabRender = this._handleCurrentTabRender.bind(this);
    }

    _handleTabClick(tab) {
      this.setState({
        currentTab: tab,
      });
    }

    _handleCurrentTabRender() {
      const {chosenMovie} = this.props;
      const {currentTab} = this.state;

      switch (currentTab) {
        case MovieNav.OVERVIEW:
          return (
            <Overview
              film={chosenMovie}
            />
          );
        case MovieNav.DETAILS:
          return (
            <Details
              film={chosenMovie}
            />
          );
        case MovieNav.REVIEWS:
          return (
            <Reviews
              chosenMovie={chosenMovie}
            />
          );
        default: return null;
      }
    }

    render() {
      const {currentTab} = this.state;

      return <Component
        {...this.props}
        currentTab={currentTab}
        onTabClick={this._handleTabClick}
        onCurrentTabRender={this._handleCurrentTabRender}
      />;
    }
  }

  WithActiveTab.propTypes = {
    chosenMovie: PropTypes.oneOfType([
      ProjectPropTypes.FILM.isRequired,
      PropTypes.bool.isRequired,
    ]).isRequired,
  };

  const mapStateToProps = (state, props) => ({
    chosenMovie: getFilmById(state, props.movieID),
  });

  return connect(mapStateToProps)(WithActiveTab);
};

export default withActiveTab;
