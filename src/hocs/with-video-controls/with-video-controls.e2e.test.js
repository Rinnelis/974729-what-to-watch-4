import React from "react";
import PropTypes from "prop-types";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withVideoControls from "./with-video-controls.js";
import films from "../../mocks/films.js";

const film = films[0];

configure({adapter: new Adapter()});

const Player = (props) => {
  const {onPlayBtnClick, children} = props;
  return (
    <div>
      <button onClick={onPlayBtnClick} />
      {children}
    </div>
  );
};

Player.propTypes = {
  onPlayBtnClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

it(`Checks that HOC's callback turn on video (play)`, () => {
  const PlayerWrapped = withVideoControls(Player);
  const wrapper = mount(<PlayerWrapped
    film={film}
    currentTime={20}
    leftTime={`00:10:12`}
    duration={100}
    isPlaying={true}
    onPlayBtnClick={() => {}}
    onFullScreenClick={() => {}}
  />);

  window.HTMLMediaElement.prototype.play = () => {};

  const {videoRef} = wrapper.instance();

  jest.spyOn(videoRef.current, `play`);

  wrapper.instance().componentDidMount();

  wrapper.find(`.player__play`).simulate(`click`);

  expect(videoRef.current.play).toHaveBeenCalledTimes(1);
});

it(`Checks that HOC's callback turn off video (pause)`, () => {
  const PlayerWrapped = withVideoControls(Player);
  const wrapper = mount(<PlayerWrapped
    film={film}
    currentTime={15}
    leftTime={`00:17:56`}
    duration={100}
    isPlaying={true}
    onPlayBtnClick={() => {}}
    onFullScreenClick={() => {}}
  />);

  window.HTMLMediaElement.prototype.pause = () => {};

  const {videoRef} = wrapper.instance();

  jest.spyOn(videoRef.current, `pause`);

  wrapper.instance().componentDidMount();

  wrapper.find(`.player__play`).simulate(`click`);

  expect(videoRef.current.pause).toHaveBeenCalledTimes(1);
});
