import * as React from "react";
import {Film} from "../../types";

interface Props {
  film: Film;
  isPlaying: boolean;
}

class VideoPlayer extends React.PureComponent<Props, {}> {
  private video: React.RefObject<HTMLVideoElement>;
  private videoPlayerSetTimeout: NodeJS.Timeout;

  constructor(props) {
    super(props);
    this.video = React.createRef();
    this.videoPlayerSetTimeout = null;
  }

  componentDidMount() {
    const {film} = this.props;
    const {image, previewUrl} = film;
    const video = this.video.current;

    video.src = previewUrl;
    video.poster = image;
    video.muted = true;
  }

  componentWillUnmount() {
    const video = this.video.current;

    video.onplay = null;
    video.src = ``;
    video.poster = ``;
    video.muted = null;
  }

  componentDidUpdate() {
    const {isPlaying} = this.props;
    const video = this.video.current;

    if (isPlaying) {
      this.videoPlayerSetTimeout = setTimeout(() => {
        video.play().catch(() => {});
      }, 1000);
    } else {
      if (this.videoPlayerSetTimeout) {
        clearTimeout(this.videoPlayerSetTimeout);
        this.videoPlayerSetTimeout = null;
        video.load();
      }
    }
  }

  render() {
    return (
      <video
        className="player__video"
        ref={this.video}
      />
    );
  }
}

export default VideoPlayer;
