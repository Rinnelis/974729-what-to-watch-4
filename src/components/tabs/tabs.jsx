import React from 'react';
import PropTypes from 'prop-types';
import {v4 as uuidv4} from "uuid";

const Tabs = (props) => {
  const {tabs, currentTab, onTabClick} = props;
  const navItems = Object.values(tabs);

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {navItems.map((tab) => (
          <li
            key={uuidv4()}
            className={currentTab === tab ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`}
            onClick={(evt) => {
              evt.preventDefault();
              onTabClick(tab);
            }}
          >
            <a href="#" className="movie-nav__link">{tab}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.objectOf(PropTypes.string).isRequired,
  currentTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
};

export default Tabs;
