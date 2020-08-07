import * as React from "react";
import {v4 as uuidv4} from "uuid";

interface Props {
  tabs: Record<string, unknown>;
  currentTab: string;
  onTabClick: (string) => void;
}

const Tabs: React.FunctionComponent<Props> = (props: Props) => {
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

export default Tabs;
