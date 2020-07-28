import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {NameSpace} from "../../reducer/name-space.js";
import {film} from "../../test-data.js";
import {Page} from "../../const.js";
import VideoPlayerFull from "./video-player-full.jsx";

const mockStore = configureStore([]);

it(`Should VideoPlayerFull render correctly`, () => {
  const store = mockStore({
    [NameSpace.PAGE]: {
      currentPage: Page.MAIN,
    }
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <VideoPlayerFull
            film={film}
            currentTime={20}
            leftTime={`00:10:12`}
            duration={100}
            isPlaying={true}
            onExitBtnClick={() => {}}
            onPlayBtnClick={() => {}}
            onFullScreenClick={() => {}}
          ><video/>
          </VideoPlayerFull>
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
