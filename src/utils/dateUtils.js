/**
 * Date Utility Functions
 * Centralized logic for date operations
 */

export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

export const isToday = (date) => {
  return isSameDay(date, new Date());
};

export const isInRange = (date, startDate, endDate) => {
  if (!startDate || !endDate) return false;
  return date >= startDate && date <= endDate;
};

export const isInHoverRange = (date, startDate, hoverDate) => {
  if (!startDate || !hoverDate) return false;
  return (date >= startDate && date <= hoverDate) || (date >= hoverDate && date <= startDate);
};

export const getMonthDays = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getPrevMonthDays = (year, month) => {
  return new Date(year, month, 0).getDate();
};

export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

export const formatDateKey = (date) => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

export const generateGridDays = (year, month) => {
  const currentMonthDays = getMonthDays(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const prevMonthDays = getPrevMonthDays(year, month);

  const gridDays = [];

  // Previous month trailing days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    gridDays.push({ empty: true, day: prevMonthDays - i });
  }

  // Current month days
  for (let i = 1; i <= currentMonthDays; i++) {
    gridDays.push({ empty: false, day: i });
  }

  // Next month leading days
  const remainingCells = 42 - gridDays.length; // 6 rows * 7 days
  for (let i = 1; i <= remainingCells; i++) {
    gridDays.push({ empty: true, day: i });
  }

  return gridDays;
};

export const getDateNoteKey = (date) => {
  return `date-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

export const getRangeNoteKey = (startDate, endDate) => {
  return `range-${startDate.getTime()}-${endDate.getTime()}`;
};

export const getMonthNoteKey = (year, month) => {
  return `month-${year}-${month}`;
};
