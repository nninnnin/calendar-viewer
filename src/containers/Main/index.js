import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Daily from '../../components/Daily';
import Weekly from '../../components/Weekly';
import Modal from '../../components/Modal';
import { schedule } from '../../utils/api';
import {
  receiveSchedules,
  setTimespanAction,
  incrementDate,
  decrementDate,
  incrementWeek,
  decrementWeek,
  setCurrSchedule } from '../../actions';
import * as Styled from '../../components/styled';
import { getAllSchedules } from '../../reducers/schedules';

function Main ({
  onLoad,
  schedules,
  timespan,
  setTimespan,
  date,
  incrementDate,
  decrementDate,
  week,
  incrementWeek,
  decrementWeek,
  setCurrSchedule }) {

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  function handleNextClick (e) {
    switch (timespan) {
      case 'daily':
        incrementDate();
        break;
      case 'weekly':
        incrementWeek();
        break;
      default:
        return;
    }
  }

  function handlePrevClick(e) {
    switch (timespan) {
      case 'daily':
        decrementDate();
        break;
      case 'weekly':
        decrementWeek();
        break;
      default:
        return;
    }
  }

  return (
    <Styled.Main>
      {
        timespan !== '' &&
        <button id="prev" onClick={handlePrevClick}>
          {'<'}
        </button>
      }
      <Link to='/main/daily'>
        <button>일간</button>
      </Link>
      <Link to='/main/weekly'>
        <button>주간</button>
      </Link>
      {
        timespan !== '' &&
        <button id="next" onClick={handleNextClick}>
          {'>'}
        </button>
      }

      <Styled.CalendarContainer>
        <Route path='/main/daily/'>
          <Daily
            date={date}
            scheduleDatas={schedules}
            updateCurrSchedule={setCurrSchedule}
            updateTimespan={setTimespan}
          />
        </Route>
        <Route path='/main/weekly/'>
          <Weekly
            week={week}
            scheduleDatas={schedules}
            updateCurrSchedule={setCurrSchedule}
            updateTimespan={setTimespan}
          />
        </Route>
        <Route path='/main/:timespan/:scheduleId'>
          <Modal />
        </Route>
      </Styled.CalendarContainer>
    </Styled.Main>
  );
}

const mapStateToProps = ({ utils: { week, date, timespan }, schedules }) => {
  return {
    week,
    date,
    timespan,
    schedules: getAllSchedules(schedules)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad () {
      schedule.getSchedules(schedules => dispatch(receiveSchedules(schedules)));
    },
    setTimespan (timespan) {
      dispatch(setTimespanAction(timespan));
    },
    ...bindActionCreators({
      incrementDate,
      decrementDate,
      incrementWeek,
      decrementWeek,
      setCurrSchedule
    }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
