import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { appartmensReducer } from "./appartments.reducer";
import { appReducer } from "./app.reducer";
import { residentsReducer } from "./residents.reducer";

const rootReducer = combineReducers({
    app: appReducer,
    appartments: appartmensReducer,
    residents: residentsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
