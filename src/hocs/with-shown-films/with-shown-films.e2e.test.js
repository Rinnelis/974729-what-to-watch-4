import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {MAX_SHOWN_FILMS_AMOUNT} from "../../const.js";
import withShownFilms from "./with-shown-films.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

const MockComponent = () => <div />;
const MockComponentWrapped = withShownFilms(MockComponent);
const maxShownFilms = MAX_SHOWN_FILMS_AMOUNT;

const wrapper = mount(
    <MockComponentWrapped
      maxShownFilms={maxShownFilms}
      onShownFilmsAmountReset={jest.fn()}
      onShownFilmsAdd={jest.fn()}
    />
);

it(`Should withShownFilms add films`, () => {
  wrapper.instance()._handleShownFilmsAdd();
  expect(wrapper.state().maxShownFilms).toEqual(maxShownFilms + MAX_SHOWN_FILMS_AMOUNT);
});

it(`Should withShownFilms reset films`, () => {
  wrapper.instance()._handleShownFilmsAdd();
  wrapper.instance()._handleShownFilmsAmountReset();
  expect(wrapper.state().maxShownFilms).toEqual(MAX_SHOWN_FILMS_AMOUNT);
});
