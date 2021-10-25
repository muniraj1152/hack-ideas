import {
  GET_IDEA_LIST,
  GET_IDEA_LIST_SUCCESS,
  GET_IDEA_LIST_FAIL,
  ADD_IDEA,
  ADD_IDEA_SUCCESS,
  ADD_IDEA_FAIL,
  GET_IDEAS_BY_TITLE,
  GET_IDEAS_BY_TITLE_SUCCESS,
  GET_IDEAS_BY_TITLE_FAIL,
} from './actionTypes';

import {
  FetchIdeaList,
  FetchIdeaListSuccess,
  FetchIdeaListSuccessPayload,
  FetchIdeaListFailure,
  FetchIdeaListFailurePayload,
  AddIdea,
  AddIdeaFail,
  AddIdeaSuccess,
  AddIdeaFailurePayload,
  AddIdeaSuccessPayload,
} from './types';

/**
 * Getting list of available ideas
 */
export const getIdeaList = (): FetchIdeaList => ({
  type: GET_IDEA_LIST,
});

export const getIdeaListSuccess = (
  payload: FetchIdeaListSuccessPayload
): FetchIdeaListSuccess => ({
  type: GET_IDEA_LIST_SUCCESS,
  payload,
});

export const getIdeaListFail = (
  payload: FetchIdeaListFailurePayload
): FetchIdeaListFailure => ({
  type: GET_IDEA_LIST_FAIL,
  payload,
});

/**
 * Add new idea in existing ideas list with title, tags and description
 */
export const addIdea = (payload: any): AddIdea => ({
  type: ADD_IDEA,
  payload,
});

export const addIdeaSuccess = (
  payload: AddIdeaSuccessPayload
): AddIdeaSuccess => ({
  type: ADD_IDEA_SUCCESS,
  payload,
});

export const addIdeaFail = (payload: AddIdeaFailurePayload): AddIdeaFail => ({
  type: ADD_IDEA_FAIL,
  payload,
});

/**
 * getIdeasByTitle used while search ideas by title
 */
export const getIdeasByTitle = (payload: any): any => ({
  type: GET_IDEAS_BY_TITLE,
  payload,
});

export const getIdeasByTitleSuccess = (payload: any): any => ({
  type: GET_IDEAS_BY_TITLE_SUCCESS,
  payload,
});

export const getIdeasByTitleFail = (payload: any): any => ({
  type: GET_IDEAS_BY_TITLE_FAIL,
  payload,
});
