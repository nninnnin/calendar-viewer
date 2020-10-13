import { combineReducers } from 'redux';
import { RECEIVE_SCHEDULE, SET_CURR_SCHEDULE } from '../constants/actionTypes';

const initialState = {
  schedules: [],
  currSchedule: {}
};

export const byDate = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_SCHEDULE:
      return {
        ...action.schedules
      };
    case SET_CURR_SCHEDULE:
      return {
        ...state,
        currSchedule: state.schedules[action.id]
      };
    default:
      return state;
  }
};

export default combineReducers({
  byDate
});

export const getAllSchedules = (state) => {
  return state.byDate;
}
