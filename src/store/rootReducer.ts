import { combineReducers } from 'redux';

import ideasReducer from './ideas/reducer';

const rootReducer = combineReducers({
  ideas: ideasReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
