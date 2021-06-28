const V = require("voca");

const StoreCreator = entities => {
  const imports = entities
    .map(a => {
      return `import ${V.camelCase(
        a.name
      )}Reducer from "./Reducers/${V.camelCase(a.name)}Reducer";
      `;
    })
    .join("");

  const reducers = entities
    .map(a => {
      return ` ${V.camelCase(a.name)}State: ${V.camelCase(a.name)}Reducer
      `;
    })
    .join(",");

  return `
   ${imports}

   import createSagaMiddleware from "redux-saga";
import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import { watchAuth } from "./Sagas";
import { save, load } from "redux-localstorage-simple";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const rootReducer = combineReducers({
     ${reducers}
    });

    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
      rootReducer,
      load(),
      composeEnhancers(applyMiddleware(sagaMiddleware, save()))
    );
    sagaMiddleware.run(watchAuth);
    
    export  {store};
    `;
};

module.exports = { StoreCreator };
