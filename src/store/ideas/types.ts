import { SAMPLE_REQUEST } from './actionTypes';

export interface FetchSampleRequest {
  type: typeof SAMPLE_REQUEST;
}

export type SampleActions = FetchSampleRequest;
