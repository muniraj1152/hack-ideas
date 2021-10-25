import { createSelector } from 'reselect';

import { AppState } from '../rootReducer';

const getIdeaList = (state: AppState) => state.idea.ideaList;

export const getIdeaListSelector = createSelector(
  getIdeaList,
  (ideaList) => ideaList
);
