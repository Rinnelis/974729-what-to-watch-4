import React, {PureComponent} from "react";

const withVideo = (Component) => {
  class WithVideo extends PureComponent {
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
