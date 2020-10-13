import * as types from '../constants/actionTypes';
import { schedule } from '../utils/api'

export const createSchedule = async newSchedule => {
  await schedule.setSchedule(newSchedule);
};

export const receiveSchedules = (schedules) => ({
  type: types.RECEIVE_SCHEDULE,
  schedules
});

export const setTimespanAction = (timespan) => {
  return {
    type: types.UPDATE_TIMESPAN,
    timespan
  };
};

export const incrementDate = () => {
  return {
    type: types.INCREMENT_DATE
  };
};

export const decrementDate = () => {
  return {
    type: types.DECREMENT_DATE
  };
};

export const incrementWeek = () => {
  return {
    type: types.INCREMENT_WEEK
  };
};

export const decrementWeek = () => {
  return {
    type: types.DECREMENT_WEEK
  };
};

export const setCurrSchedule = (id) => {
  return {
    type: types.SET_CURR_SCHEDULE,
    id
  }
}
