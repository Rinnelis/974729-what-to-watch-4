import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import withReview from "./with-review.jsx";
import {film} from "../../test-data.js";
import {NameSpace} from "../../reducer/name-space.js";

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.MOVIES]: {
    chosenMovie: film,
  },
});

const MockComponent = () => <div />;
const MockComponentWrapped = withReview(MockComponent);

it(`withReview is rendered correctly`, () => {
  const tree = renderer.create((
    <Provider store={store}>
      <MockComponentWrapped
        onReviewSubmit={() => {}}
      />
    </Provider>
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
