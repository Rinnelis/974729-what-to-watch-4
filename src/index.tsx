import * as React from "react";
import * as ReactDOM from "react-dom";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import App from "./components/app/app";
import reducer from "./reducer/reducer";
import {Operation as DataOperation} from "./reducer/data/data";
import {createAPI} from "./api";
import {AuthStatus} from "./const";
import {ActionCreator, Operation as UserOperation} from "./reducer/user/user";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuth(AuthStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperation.loadFilms());
store.dispatch(DataOperation.loadPromo());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
