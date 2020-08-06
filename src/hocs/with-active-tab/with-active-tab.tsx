import * as React from "react";
import {Subtract} from "utility-types";
import {connect} from "react-redux";
import {Film} from "../../types";
import {MovieNav} from "../../const";
import Overview from "../../components/overview/overview";
import Details from "../../components/details/details";
import Reviews from "../../components/reviews/reviews";
import {getFilmById} from "../../reducer/data/selectors";

interface Props {
  chosenMovie: Film;
}

interface State {
  currentTab: string;
}

interface InjectedProps {
  currentTab: string;
  handleTabClick: (tab: string) => void;
  handleCurrentTabRender: () => void;
}

const withActiveTab = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithActiveTab extends React.PureComponent<T, State> {
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

  const mapStateToProps = (state, props) => ({
    chosenMovie: getFilmById(state, props.movieID),
  });

  return connect(mapStateToProps)(WithActiveTab);
};

export default withActiveTab;
