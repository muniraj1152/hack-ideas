import {
  GET_IDEA_LIST,
  GET_IDEA_LIST_SUCCESS,
  GET_IDEA_LIST_FAIL,
  ADD_IDEA,
  ADD_IDEA_FAIL,
  ADD_IDEA_SUCCESS,
  GET_IDEAS_BY_TITLE_SUCCESS,
  GET_IDEAS_BY_TITLE_FAIL,
} from './actionTypes';

export interface IIdea {
  id: number;
  title: string;
  description: string;
  tags: Array<string>;
  employeeId: string;
}

export interface IdeaState {
  pending: boolean;
  ideaList: IIdea[] | Array<any>;
  error: string | null;
}

export interface FetchIdeaListSuccessPayload {
  ideaList: IIdea[];
}

export interface FetchIdeaListFailurePayload {
  error: string;
}

export interface AddIdeaSuccessPayload {
  ideaList: IIdea[];
}

export interface AddIdeaFailurePayload {
  error: string;
}

export interface AddIdea {
  type: typeof ADD_IDEA;
  payload: IIdea;
}

export type AddIdeaSuccess = {
  type: typeof ADD_IDEA_SUCCESS;
  payload: FetchIdeaListSuccessPayload;
};

export type AddIdeaFail = {
  type: typeof ADD_IDEA_FAIL;
  payload: FetchIdeaListFailurePayload;
};

export interface FetchIdeaList {
  type: typeof GET_IDEA_LIST;
}

export type FetchIdeaListSuccess = {
  type: typeof GET_IDEA_LIST_SUCCESS;
  payload: FetchIdeaListSuccessPayload;
};

export type FetchIdeaListFailure = {
  type: typeof GET_IDEA_LIST_FAIL;
  payload: FetchIdeaListFailurePayload;
};

export type FetchIdeaListByTitleSuccess = {
  type: typeof GET_IDEAS_BY_TITLE_SUCCESS;
  payload: any;
};

export type FetchIdeaListByTitleFailure = {
  type: typeof GET_IDEAS_BY_TITLE_FAIL;
  payload: any;
};

export type IdeaActions =
  | FetchIdeaList
  | FetchIdeaListSuccess
  | FetchIdeaListFailure
  | AddIdea
  | AddIdeaSuccess
  | AddIdeaFail
  | FetchIdeaListByTitleSuccess
  | FetchIdeaListByTitleFailure;
