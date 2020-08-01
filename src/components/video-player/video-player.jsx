import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {ProjectPropTypes} from "../../project-prop-types.js";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);
    this._video = createRef();
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

VideoPlayer.propTypes = {
  film: ProjectPropTypes.FILM.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default VideoPlayer;
