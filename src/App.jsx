import { useState, useEffect, useMemo } from 'react';
import './index.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Notes from './components/Notes';
import Calendar from './components/Calendar';
import { MONTHS } from './utils/config';
import { useNotes } from './hooks/useNotes';
import {
  getDateNoteKey,
  getRangeNoteKey,
  getMonthNoteKey,
  isSameDay,
} from './utils/dateUtils';
import { FLIPPING_DURATION } from './utils/config';

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [theme, setTheme] = useState('light');

  // Selection state
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

  // Animation state
  const [isFlipping, setIsFlipping] = useState(false);

  // Notes management with error handling
  const { notes, updateNote, error: notesError, clearError: clearNotesError } = useNotes();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Determine active note key based on selection
  const activeNoteKey = useMemo(() => {
    if (startDate && endDate) {
      if (isSameDay(startDate, endDate)) {
        return getDateNoteKey(startDate);
      }
      return getRangeNoteKey(startDate, endDate);
    }
    if (startDate) {
      return getDateNoteKey(startDate);
    }
    return getMonthNoteKey(year, month);
  }, [startDate, endDate, year, month]);

  const handleNoteChange = (e) => {
    const text = e.target.value;
    updateNote(activeNoteKey, text);
  };

  const getNoteTitle = () => {
    if (startDate && endDate) {
      if (isSameDay(startDate, endDate)) {
        return `Notes for ${MONTHS[startDate.getMonth()]} ${startDate.getDate()}`;
      }
      return `Notes for selected range`;
    }
    if (startDate) {
      return `Notes for ${MONTHS[startDate.getMonth()]} ${startDate.getDate()}`;
    }
    return `${MONTHS[month]} Memos`;
  };

  // Update body theme attribute
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const changeMonth = (offset) => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentDate(prev => {
        const d = new Date(prev);
        d.setMonth(d.getMonth() + offset);
        return d;
      });
      setIsFlipping(false);
    }, FLIPPING_DURATION / 2);
  };

  const handleDateClick = (day, clearSelection = false) => {
    if (clearSelection) {
      setStartDate(null);
      setEndDate(null);
      return;
    }

    const clickedDate = new Date(year, month, day);

    // Three-state selection: reset → start → range
    if (startDate && endDate) {
      setStartDate(clickedDate);
      setEndDate(null);
    } else if (!startDate) {
      setStartDate(clickedDate);
    } else {
      // Complete the range
      if (clickedDate < startDate) {
        setEndDate(startDate);
        setStartDate(clickedDate);
      } else {
        setEndDate(clickedDate);
      }
    }
  };

  const handleDateHover = (day) => {
    if (startDate && !endDate && day !== null) {
      setHoverDate(new Date(year, month, day));
    } else {
      setHoverDate(null);
    }
  };

  return (
    <div className="app-wrapper">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <div className="wall-calendar">
        <div className="calendar-left">
          <Hero month={MONTHS[month]} year={year} />
          <Notes
            title={getNoteTitle()}
            content={notes[activeNoteKey] || ''}
            onChange={handleNoteChange}
            error={notesError}
            onDismissError={clearNotesError}
          />
        </div>

        <Calendar
          currentDate={currentDate}
          startDate={startDate}
          endDate={endDate}
          hoverDate={hoverDate}
          onDateClick={handleDateClick}
          onDateHover={handleDateHover}
          onChangeMonth={changeMonth}
          notes={notes}
          isFlipping={isFlipping}
        />
      </div>
    </div>
  );
}
