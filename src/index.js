import React from "react";
import ReactDOM from "react-dom";
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import App from "./components/app/app.jsx";
import withChosenMovie from "./hocs/with-chosen-movie/with-chosen-movie.js";
import reducer from "./reducer/reducer.js";
import {Operation} from "./reducer/data/data.js";
import {createAPI} from "./api.js";

const AppWrapped = withChosenMovie(App);

const api = createAPI();

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f)
);

store.dispatch(Operation.loadFilms());
store.dispatch(Operation.loadPromo());

ReactDOM.render(
    <Provider store={store}>
      <AppWrapped />
    </Provider>,
    document.querySelector(`#root`)
);
