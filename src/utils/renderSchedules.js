import React from 'react';
import { Link } from 'react-router-dom';

export default function renderSchedules (scheduleDatas, date, isWeekly, setCurrSchedule) {
  const schedules = [];
  const PIXEL_RATE = {
    perDay: 720,
    perHour: 30,
    perMinute: 0.5
  };

  const dailySchedules = scheduleDatas[date];
  if (!dailySchedules) {
    return;
  }

  let zIndexOrder = Object.values(dailySchedules).length;
  for (let [id, schedule] of Object.entries(dailySchedules)) {
    const scheduleTop = calculateScheduleTop(schedule);
    const scheduleHeight = calculateScheduleHeight(schedule);

    const style = {
      zIndex: zIndexOrder * 500,
      top: scheduleTop,
      width: '100%',
      height: scheduleHeight,
      backgroundColor: schedule.color || '#cbf542',
      overflow: 'auto'
    };

    const element =
      <Link
        to={`/main/${isWeekly ? 'weekly' : 'daily'}/${id}`}
        onClick={() => handleClick(dailySchedules, id)}
        key={`schedule-${schedule.name}`}
      >
        <div className='schedule' style={style} >
            <span className='scheduleName'>{schedule.name}</span>
            <br/>
            <span className='scheduleDesc'>{schedule.desc}</span>
        </div>
      </Link>

    schedules.push(element);

    zIndexOrder--;
  }

  function calculateScheduleTop (schedule) {
    if (schedule.startTime === '') return 0;

    const [hour, minute] = schedule.startTime.split(':');
    return parseInt(hour) * PIXEL_RATE.perHour + parseInt(minute) / PIXEL_RATE.perMinute;
  }

  function calculateScheduleHeight (schedule) {
    if (schedule.endTime === '') return PIXEL_RATE.perHour;

    const [hour, minute] = schedule.endTime.split(':');

    if (schedule.endTime < schedule.startTime) {
      return PIXEL_RATE.perDay - calculateScheduleTop(schedule);
    }

    return parseInt(hour) * PIXEL_RATE.perHour + parseInt(minute) / PIXEL_RATE.perMinute - calculateScheduleTop(schedule);
  }

  function handleClick (dailySchedule, id) {
    // currSchedule을 바꾸는 액션 dispatching
    setCurrSchedule();
  }

  return schedules;
}
