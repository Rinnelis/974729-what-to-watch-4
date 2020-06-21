import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: {},
    };

    this.handleMovieCardMouseEnter = this.handleMovieCardMouseEnter.bind(this);
  }

  handleMovieCardMouseEnter(movie) {
    this.setState({
      activeCard: movie
    });
  }

  render() {
    const {films, onTitleClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {films.map((film) => {
          return <MovieCard
            key={film.title}
            film={film}
            onTitleClick={onTitleClick}
            onMouseEnter={this.handleMovieCardMouseEnter}
          />;
        })}
      </div>
    );
  }
}

MoviesList.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  onTitleClick: PropTypes.func.isRequired,
};

export default MoviesList;
