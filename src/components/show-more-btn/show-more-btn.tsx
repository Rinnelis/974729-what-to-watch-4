import * as React from "react";

interface Props {
  onShowMoreClick: () => void;
}

const ShowMoreButton: React.FunctionComponent<Props> = (props: Props) => {
  const {onShowMoreClick} = props;

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button"
        onClick={(evt) => {
          evt.preventDefault();
          onShowMoreClick();
        }}
      >Show more</button>
    </div>
  );
};

export default ShowMoreButton;
