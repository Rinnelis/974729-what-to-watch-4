import * as React from "react";
import {Subtract} from "utility-types";

interface State {
  isVideoPlaying: boolean;
}

interface InjectedProps {
  isVideoPlaying: boolean;
  setVideoPlaying: (isVideoPlaying: boolean) => void;
}

const withVideo = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectedProps>;

  class WithVideo extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        isVideoPlaying: false,
      };

      this._setVideoPlaying = this._setVideoPlaying.bind(this);
    }

    _setVideoPlaying(isVideoPlaying) {
      this.setState({
        isVideoPlaying,
      });
    }

    render() {
      const {isVideoPlaying} = this.state;

      return <Component
        {...this.props}
        isVideoPlaying={isVideoPlaying}
        setVideoPlaying={this._setVideoPlaying}
      />;
    }
  }

  return WithVideo;
};

export default withVideo;
