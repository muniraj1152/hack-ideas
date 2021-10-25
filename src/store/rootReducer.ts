import { combineReducers } from 'redux';

import ideasReducer from './ideas/reducer';

const rootReducer = combineReducers({
  idea: ideasReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
