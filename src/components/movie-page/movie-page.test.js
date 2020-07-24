import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";
import {film, films} from "../../test-data.js";

it(`Should MoviePage render correctly`, () => {
  const tree = renderer
    .create(<MoviePage
      film={film}
      similarFilms={films}
      onCardClick={() => {}}
      currentTab={`Overview`}
      onTabClick={() => {}}
      onCurrentTabRender={() => {}}
      onPlayBtnClick={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    }
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
