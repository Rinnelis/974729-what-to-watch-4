import * as React from "react";
import {Film} from "../../types";

interface Props {
  film: Film;
  isPlaying: boolean;
}

class VideoPlayer extends React.PureComponent<Props, {}> {
  private _video: React.RefObject<HTMLVideoElement>;
  private _videoPlayerSetTimeout: NodeJS.Timeout;

  constructor(props) {
    super(props);
    this._video = React.createRef();
    this._videoPlayerSetTimeout = null;
  }

  componentDidMount() {
    const {film} = this.props;
    const {image, previewUrl} = film;
    const video = this._video.current;

    video.src = previewUrl;
    video.poster = image;
    video.muted = true;
  }

  componentWillUnmount() {
    const video = this._video.current;

    video.onplay = null;
    video.src = ``;
    video.poster = ``;
    video.muted = null;
  }

  componentDidUpdate() {
    const {isPlaying} = this.props;
    const video = this._video.current;

    if (isPlaying) {
      this._videoPlayerSetTimeout = setTimeout(() => {
        video.play().catch(() => {});
      }, 1000);
    } else {
      if (this._videoPlayerSetTimeout) {
        clearTimeout(this._videoPlayerSetTimeout);
        this._videoPlayerSetTimeout = null;
        video.load();
      }
    }
  }

  render() {
    return (
      <video
        className="player__video"
        ref={this._video}
      />
    );
  }
}

export default VideoPlayer;
