import React from 'react';
import renderer from 'react-test-renderer';
import Tabs from './tabs.jsx';

const MovieNavList = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`,
};

it(`Should Tabs render correctly`, () => {
  const tree = renderer
    .create(<Tabs
      tabs={MovieNavList}
      currentTab={MovieNavList.OVERVIEW}
      onTabClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
