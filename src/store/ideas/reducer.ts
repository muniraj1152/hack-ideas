import { SAMPLE_REQUEST } from './actionTypes';

const initialState: any = {
  pending: false,
  ideas: [],
  error: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SAMPLE_REQUEST:
      return {
        ...state,
        pending: true,
      };
    default:
      return {
        ...state,
      };
  }
};
