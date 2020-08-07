import * as React from "react";
import {Subtract} from "utility-types";
import {connect} from "react-redux";
import {Film} from "../../types";
import {Time} from "../../const";
import {getFilmById} from "../../reducer/data/selectors";
import {noop} from "../../utils";

interface Props {
  film: Film;
}

interface State {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
}

interface InjectedProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  handlePlayBtnClick: () => void;
  handleFullScreenClick: () => void;
  handleLeftTimeGet: () => void;
}

const withVideoControls = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithVideoControls extends React.PureComponent<T, State> {
    private videoRef: React.RefObject<HTMLVideoElement>;

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

    componentDidMount() {
      const {chosenMovie} = this.props;
      const video = this.videoRef.current;

      video.src = chosenMovie.videoUrl;
      video.play().catch(noop);

      video.onloadedmetadata = () => this.setState({
        duration: video.duration,
      });

      video.ontimeupdate = () => this.setState({
        currentTime: Math.trunc(video.currentTime),
      });
    }

    componentWillUnmount() {
      const video = this.videoRef.current;

      video.src = ``;
      video.onplay = null;
      video.onloadedmetadata = null;
      video.ontimeupdate = null;
      video.controls = null;
    }

    componentDidUpdate() {
      const video = this.videoRef.current;

      if (document.fullscreenElement === null) {
        video.controls = false;
      }

      if (this.state.isPlaying) {
        video.play().catch(noop);
      } else {
        video.pause();
      }
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
      video.controls = true;
    }

    _handleLeftTimeGet() {
      const {currentTime, duration} = this.state;
      const timeDiff = duration - currentTime;

      const seconds = Math.trunc(timeDiff % Time.SECONDS_PER_MINUTE);
      const minutes = Math.trunc(timeDiff / Time.SECONDS_PER_MINUTE);
      const hours = Math.trunc(minutes / Time.MINUTES_PER_HOUR);

      return `${hours.toString().padStart(2, `0`)}:${minutes.toString().padStart(2, `0`)}:${seconds.toString().padStart(2, `0`)}`;
    }

    render() {
      const {currentTime, duration, isPlaying} = this.state;
      const {chosenMovie} = this.props;
      const leftTime = this._handleLeftTimeGet();

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
          poster={chosenMovie.bgImage}
          ref={this.videoRef}
        >Your browser doesn`t support embedded video</video>
      </Component>;
    }
  }

  const mapStateToProps = (state, props) => ({
    chosenMovie: getFilmById(state, props.movieID),
  });

  return connect(mapStateToProps)(WithVideoControls);
};

export default withVideoControls;
