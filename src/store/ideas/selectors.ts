import { createSelector } from 'reselect';

import { AppState } from '../rootReducer';

const getIdeas = (state: AppState) => state.ideas.ideasList;

export const getIdeasSelector = createSelector(getIdeas, (ideas) => ideas);
