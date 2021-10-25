import {
  GET_IDEA_LIST_SUCCESS,
  GET_IDEA_LIST_FAIL,
  ADD_IDEA_SUCCESS,
  ADD_IDEA_FAIL,
  GET_IDEAS_BY_TITLE_SUCCESS,
  GET_IDEAS_BY_TITLE_FAIL,
} from './actionTypes';

import { IdeaActions, IdeaState } from './types';

const initialState: IdeaState = {
  pending: false,
  ideaList: [],
  error: null,
};

export default (state = initialState, action: IdeaActions) => {
  switch (action.type) {
    case ADD_IDEA_SUCCESS:
      return {
        ...state,
        ideaList: action.payload.ideaList,
        error: null,
      };
    case ADD_IDEA_FAIL:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    case GET_IDEA_LIST_SUCCESS:
      return {
        ...state,
        ideaList: action.payload.ideaList,
        error: null,
      };
    case GET_IDEA_LIST_FAIL:
      return {
        ...state,
        pending: false,
        ideaList: [],
        error: action.payload.error,
      };
    case GET_IDEAS_BY_TITLE_SUCCESS:
      return {
        ...state,
        ideaList: action.payload.ideaList,
        error: null,
      };
    case GET_IDEAS_BY_TITLE_FAIL:
      return {
        ...state,
        pending: false,
        ideaList: [],
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
