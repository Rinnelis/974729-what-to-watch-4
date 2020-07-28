import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {ProjectPropTypes} from "../../project-prop-types.js";
import {MovieNav} from "../../const.js";
import Overview from "../../components/overview/overview.jsx";
import Details from "../../components/details/details.jsx";
import Reviews from "../../components/reviews/reviews.jsx";

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
      const {film} = this.props;
      const {currentTab} = this.state;

      switch (currentTab) {
        case MovieNav.OVERVIEW:
          return (
            <Overview
              film={film}
            />
          );
        case MovieNav.DETAILS:
          return (
            <Details
              film={film}
            />
          );
        case MovieNav.REVIEWS:
          return (
            <Reviews />
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
    film: PropTypes.oneOfType([
      ProjectPropTypes.FILM.isRequired,
      PropTypes.bool.isRequired,
    ]).isRequired
  };

  return WithActiveTab;
};

export default withActiveTab;
