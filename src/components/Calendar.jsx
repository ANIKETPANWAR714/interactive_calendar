import { DAYS, MONTHS, HOLIDAYS } from '../utils/config';
import { ChevronLeft, ChevronRight } from './Icons';
import {
  isToday,
  isInRange,
  isInHoverRange,
  generateGridDays,
  isSameDay,
} from '../utils/dateUtils';

const Calendar = ({
  currentDate,
  startDate,
  endDate,
  hoverDate,
  onDateClick,
  onDateHover,
  onChangeMonth,
  notes,
  isFlipping,
}) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = MONTHS[month];
  const gridDays = generateGridDays(year, month);

  const handleMonthChange = (offset) => {
    onChangeMonth(offset);
  };

  return (
    <div className="calendar-right">
      <div className="calendar-header">
        <button
          className="month-nav-btn"
          onClick={() => handleMonthChange(-1)}
          aria-label="Previous month"
          title="Previous month"
        >
          <ChevronLeft />
        </button>
        <div className="current-month-display">
          {monthName} {year}
        </div>
        <button
          className="month-nav-btn"
          onClick={() => handleMonthChange(1)}
          aria-label="Next month"
          title="Next month"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="weekdays">
        {DAYS.map(d => (
          <div key={d} className="weekday-header">
            {d}
          </div>
        ))}
      </div>

      <div className="days-grid-container">
        <div className={`days-grid ${isFlipping ? 'flipping' : ''}`}>
          {gridDays.map((cell, idx) => {
            if (cell.empty) {
              return (
                <div key={`empty-${idx}`} className="date-cell empty">
                  <span className="date-number">{cell.day}</span>
                </div>
              );
            }

            const d = new Date(year, month, cell.day);

            // Determine states
            const isStart = startDate && isSameDay(d, startDate);
            const isEnd = endDate && isSameDay(d, endDate);

            let inRange = false;
            if (startDate && endDate) {
              inRange = isInRange(d, startDate, endDate);
            } else if (startDate && hoverDate) {
              inRange = isInHoverRange(d, startDate, hoverDate);
            }

            // Check for holiday
            const mm = String(month + 1).padStart(2, '0');
            const dd = String(cell.day).padStart(2, '0');
            const isHoliday = HOLIDAYS[`${mm}-${dd}`];

            // Check for notes
            const hasNote = notes[`date-${year}-${month}-${cell.day}`];

            let classNames = 'date-cell';
            if (isToday(d)) classNames += ' today';
            if (isStart) classNames += ' start-date';
            if (isEnd) classNames += ' end-date';
            if (inRange) classNames += ' in-range';

            return (
              <div
                key={`day-${cell.day}`}
                className={classNames}
                onClick={() => onDateClick(cell.day)}
                onMouseEnter={() => onDateHover(cell.day)}
                onMouseLeave={() => onDateHover(null)}
                onTouchStart={() => onDateHover(cell.day)}
                role="button"
                tabIndex={0}
                aria-label={`${monthName} ${cell.day}, ${year}${isHoliday ? ` - ${isHoliday}` : ''}`}
                aria-pressed={isStart || isEnd ? true : false}
              >
                <span className="date-number">{cell.day}</span>
                <div className="marker-container">
                  {isHoliday && (
                    <div
                      className="marker holiday"
                      title={isHoliday}
                      aria-label={isHoliday}
                    />
                  )}
                  {hasNote && <div className="marker note" title="Has note" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="selection-info" role="status" aria-live="polite">
        {startDate && endDate ? (
          <>
            <span>
              Selected:{' '}
              {MONTHS[startDate.getMonth()]} {startDate.getDate()} -{' '}
              {MONTHS[endDate.getMonth()]} {endDate.getDate()}
            </span>
            <button
              className="clear-btn"
              onClick={() => {
                onDateClick(null, true); // Signal to clear selection
              }}
              aria-label="Clear date selection"
            >
              Clear
            </button>
          </>
        ) : startDate ? (
          <>
            <span>
              Selected:{' '}
              {MONTHS[startDate.getMonth()]} {startDate.getDate()}{' '}
              <span style={{ fontSize: '0.85em', opacity: 0.7 }}>
                — Tap another date to complete range
              </span>
            </span>
            <button
              className="clear-btn"
              onClick={() => {
                onDateClick(null, true);
              }}
              aria-label="Clear date selection"
            >
              Clear
            </button>
          </>
        ) : (
          <span>Select dates to plan timeline</span>
        )}
      </div>
    </div>
  );
};

export default Calendar;
