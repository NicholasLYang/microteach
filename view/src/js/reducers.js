import combineReducers from "redux/lib/combineReducers";
import { routerReducer } from "react-router-redux/reducer";
import { reducer as formReducer } from "redux-form";
import core from "./modules/core";

export default combineReducers({
  [core.constants.NAME]: core.reducer,
  router: routerReducer,
  form: formReducer
});
