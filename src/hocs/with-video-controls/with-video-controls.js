import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ProjectPropTypes} from "../../project-prop-types.js";
import {Time} from "../../const.js";
import {getChosenMovie} from "../../reducer/movies/selectors.js";

const withVideoControls = (Component) => {
  class WithVideoControls extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        currentTime: 0,
        duration: 0,
        isPlaying: true,
      };

      this.videoRef = React.createRef();

      this._handlePlayBtnClick = this._handlePlayBtnClick.bind(this);
      this._handleFullScreenClick = this._handleFullScreenClick.bind(this);
    }

    _handlePlayBtnClick() {
      const {isPlaying} = this.state;

      this.setState({
        isPlaying: !isPlaying,
      });
    }

    _handleFullScreenClick() {
      const video = this.videoRef.current;
      video.requestFullscreen();
    }

    _getLeftTime() {
      const {currentTime, duration} = this.state;
      const timeDiff = duration - currentTime;

      const seconds = Math.trunc(timeDiff % Time.SECONDS_PER_MINUTE);
      const minutes = Math.trunc(timeDiff / Time.SECONDS_PER_MINUTE);
      const hours = Math.trunc(minutes / Time.MINUTES_PER_HOUR);

      return `${hours.toString().padStart(2, `0`)}:${minutes.toString().padStart(2, `0`)}:${seconds.toString().padStart(2, `0`)}`;
    }

    componentDidMount() {
      const {chosenMovie} = this.props;
      const video = this.videoRef.current;

      video.src = chosenMovie.videoUrl;
      video.play();

      video.onloadedmetadata = () => this.setState({
        duration: video.duration,
      });

      video.ontimeupdate = () => this.setState({
        currentTime: Math.trunc(video.currentTime),
      });
    }

    componentDidUpdate() {
      const video = this.videoRef.current;

      if (this.state.isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    componentWillUnmount() {
      const video = this.videoRef.current;

      video.src = ``;
      video.onplay = null;
      video.onloadedmetadata = null;
      video.ontimeupdate = null;
    }

    render() {
      const {currentTime, duration, isPlaying} = this.state;
      const {chosenMovie} = this.props;
      const leftTime = this._getLeftTime();

      return <Component
        {...this.props}
        currentTime={currentTime}
        duration={duration}
        isPlaying={isPlaying}
        leftTime={leftTime}
        onPlayBtnClick={this._handlePlayBtnClick}
        onFullScreenClick={this._handleFullScreenClick}
      >
        <video className="player__video"
          poster={chosenMovie.poster}
          ref={this.videoRef}
        >Your browser doesn`t support embedded video</video>
      </Component>;
    }
  }

  WithVideoControls.propTypes = {
    chosenMovie: PropTypes.oneOfType([
      ProjectPropTypes.FILM,
      PropTypes.bool,
    ]).isRequired,
  };

  const mapStateToProps = (state) => ({
    chosenMovie: getChosenMovie(state),
  });

  return connect(mapStateToProps)(WithVideoControls);
};

export default withVideoControls;
