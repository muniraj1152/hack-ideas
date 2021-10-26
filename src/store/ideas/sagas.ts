import { SagaIterator } from 'redux-saga';
import { all, takeLatest, call, put } from 'redux-saga/effects';

import { GET_IDEA_LIST, ADD_IDEA, GET_IDEAS_BY_TITLE } from './actionTypes';
import {
  getIdeaListSuccess,
  getIdeaListFail,
  addIdeaSuccess,
  addIdeaFail,
  getIdeasByTitleFail,
  getIdeasByTitleSuccess,
} from './actions';

/**
 * getIdeaList returns all avaialble ideas
 */
const getIdeaList = () => {
  const list: any = localStorage.getItem('ideas');
  return JSON.parse(list) ? JSON.parse(list) : [];
};

/**
 * To add new idea or update existing idea
 * Update upvoteList in idea object
 * @param idea
 */
const addIdea = (idea: any) => {
  const list: any = localStorage.getItem('ideas');
  const ideaList: any = JSON.parse(list) ? JSON.parse(list) : [];

  // checking id to determine whether idea object is new or existing.
  if (idea.id === '0') {
    if (!ideaList) {
      localStorage.setItem('lastIdeaId', '1');
    } else {
      const id = Number(localStorage.getItem('lastIdeaId'));
      localStorage.setItem('lastIdeaId', `${id + 1}`);
    }
    idea.id = localStorage.getItem('lastIdeaId');
    idea.employeeId = localStorage.getItem('loggedInUserId') || 0;
    ideaList.push(idea);
  } else {
    let ideaIndex: any = null;
    ideaList &&
      ideaList.map((item: any, index: number) => {
        if (Number(item.id) === Number(idea.id)) {
          ideaIndex = index;
        }
      });
    ideaList[ideaIndex] = idea;
  }

  localStorage.setItem('ideas', JSON.stringify(ideaList));
  return ideaList;
};

/**
 * This method used for filtering ideas based on title
 * @param searchText
 */
const getIdeasByTitle = (searchText: any) => {
  const list: any = localStorage.getItem('ideas');
  const ideas = JSON.parse(list) ? JSON.parse(list) : [];
  const ideaList =
    ideas &&
    ideas.filter((idea: any) => {
      return idea.title.toLowerCase().includes(searchText);
    });
  return ideaList;
};

/*
  Worker Saga: Fired on GET_IDEA_LIST action
*/
function* getIdeaListSaga(): SagaIterator {
  try {
    const response = yield call(getIdeaList);
    yield put(
      getIdeaListSuccess({
        ideaList: response,
      })
    );
  } catch (e: any) {
    yield put(
      getIdeaListFail({
        error: e.message,
      })
    );
  }
}

/*
  Worker Saga: Fired on ADD_IDEA action
*/
function* addIdeaSaga({ payload }: any): SagaIterator {
  try {
    const response = yield call(addIdea, payload);
    yield put(
      addIdeaSuccess({
        ideaList: response,
      })
    );
  } catch (e: any) {
    yield put(
      addIdeaFail({
        error: e.message,
      })
    );
  }
}

/*
  Worker Saga: Fired on GET_IDEAS_BY_TITLE action
*/
function* getIdeasByTitleSaga({ payload }: any): SagaIterator {
  try {
    const response = yield call(getIdeasByTitle, payload);
    yield put(
      getIdeasByTitleSuccess({
        ideaList: response,
      })
    );
  } catch (e: any) {
    yield put(
      getIdeasByTitleFail({
        error: e.message,
      })
    );
  }
}

function* ideaSaga() {
  yield all([
    takeLatest(ADD_IDEA, addIdeaSaga),
    takeLatest(GET_IDEA_LIST, getIdeaListSaga),
    takeLatest(GET_IDEAS_BY_TITLE, getIdeasByTitleSaga),
  ]);
}

export default ideaSaga;
