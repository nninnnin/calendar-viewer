import React, { useEffect } from 'react';
import renderSchedules from '../../utils/renderSchedules';
import * as Styled from '../styled';

export default function Daily ({ date, scheduleDatas, updateTimespan, setCurrSchedule }) {
  useEffect(() => {
    updateTimespan('daily');
  }, [updateTimespan]);

  function renderTimelines () {
    let timelines = [];
    for (let i = 0; i < 24; i++) {
      const time = i % 12;
      timelines.push(
        <div className='timeline' key={`time-${i}`}>
          <span className='time'>{`${i >= 12 ? 'PM' : 'AM'} ${time}시`}</span>
        </div>
      );
    }

    return timelines;
  }

  return (
    <Styled.Daily>
      <h2>{date}</h2>
      <div className='timelines'>
        {renderTimelines()}
      </div>
      <div className='schedules'>
        {renderSchedules(scheduleDatas, date, false, setCurrSchedule)}
      </div>
    </Styled.Daily>
  );
}
