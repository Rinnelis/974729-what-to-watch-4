import * as React from "react";
import {Film} from "../../types.js";
import {Page} from "../../const";
import history from "../../history";

interface Props {
  chosenMovie: Film;
  children: React.ReactNode;
  currentTime: number;
  leftTime: string;
  duration: number;
  isPlaying: boolean;
  onPlayBtnClick: () => void;
  onFullScreenClick: () => void;
}

const VideoPlayerFull: React.FunctionComponent<Props> = (props: Props) => {
  const {
    chosenMovie,
    children,
    currentTime,
    leftTime,
    duration,
    isPlaying,
    onPlayBtnClick,
    onFullScreenClick,
  } = props;

  const videoProgress = ((currentTime * 100) / duration) + `%`;

  const playerState = isPlaying
    ?
    <React.Fragment>
      <svg viewBox="0 0 14 21" width="14" height="21">
        <use xlinkHref="#pause"></use>
      </svg>
      <span>Pause</span>
    </React.Fragment>
    :
    <React.Fragment>
      <svg viewBox="0 0 19 19" width="19" height="19">
        <symbol id="play-s" viewBox="0 0 19 19">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 0L19 9.5L0 19V0Z" fill="#EEE5B5" />
        </symbol>
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </React.Fragment>;

  return (
    <div className="player">
      {children}

      <button type="button" className="player__exit"
        onClick={() => history.push(`${Page.FILM}/${chosenMovie.id}`)}
      >Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={currentTime} max={duration}></progress>
            <div className="player__toggler" style={/* stylelint-disable-line */{left: videoProgress}}
            >Toggler</div>
          </div>
          <div className="player__time-value">{leftTime}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play"
            onClick={() => onPlayBtnClick()}
          >
            {playerState}
          </button>
          <div className="player__name">{chosenMovie.title}</div>

          <button type="button" className="player__full-screen"
            onClick={() => onFullScreenClick()}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerFull;
