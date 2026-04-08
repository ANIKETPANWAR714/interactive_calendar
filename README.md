# 📅 Interactive Calendar

A beautifully designed, fully responsive interactive wall calendar component built with React and Vite. Features smooth animations, intelligent date range selection, integrated notes system, and theme switching between light and dark modes.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![React](https://img.shields.io/badge/React-19.2.4-blue)
![Vite](https://img.shields.io/badge/Vite-8.0.7-purple)

## ✨ Features

### Core Functionality
- **📆 Wall Calendar Aesthetic**: Split-layout design with hero image and interactive calendar grid
- **📍 Day Range Selection**: Click to select start date, click again to select end date with live hover preview
- **📝 Integrated Notes System**: 
  - Month-level notes for general memos
  - Single-date notes for specific days
  - Range notes for selected date ranges
  - localStorage persistence with error handling
- **🎨 Theme Switching**: Light (warm sunset) and dark (midnight blue) modes with smooth transitions
- **📱 Fully Responsive**: Optimized layouts for mobile (320px), tablet (768px), and desktop (1200px+)
- **🎭 Smooth Animations**: 
  - 3D month flip effect when navigating
  - Fade transitions on theme switch
  - Hover effects on interactive elements
  - Bounce easing for delightful interactions

### Visual Enhancements
- **🏖️ Holiday Markers**: 14 holidays highlighted (US holidays)
- **✍️ Note Indicators**: Visual markers show which dates have notes attached
- **♿ Accessibility**: WCAG AA+ compliant with keyboard navigation and screen reader support
- **⌚ Today Indicator**: Current date visually distinguished
- **📊 Selection Feedback**: Real-time hover preview of date ranges before selection

## 🎯 Design Decisions

### Architecture
- **Component Modularity**: 5 focused components (Calendar, Header, Hero, Notes, Icons) - each with single responsibility
- **Custom Hooks**: `useNotes` hook encapsulates localStorage persistence and error handling
- **Utility Functions**: 11 pure date utility functions prevent fragile date logic scattered across components
- **Centralized Constants**: All magic numbers and strings in `config.js` for maintainability

### Styling
- **CSS Variables**: Comprehensive theming system supports light/dark modes without component changes
- **Mobile-First**: Base styles for mobile, enhanced with media queries for larger screens
- **Performance**: Only transform and opacity transitions (GPU-accelerated)
- **Accessibility**: Focus states, reduced-motion support, semantic HTML

### State Management
- **Minimal State**: Only `currentDate`, `startDate`, `endDate`, `theme`, and `notes` state
- **Computed Values**: `activeNoteKey` uses `useMemo` to prevent unnecessary recalculations
- **Local Persistence**: Notes stored in localStorage with QuotaExceededError handling

## 📦 Technology Stack

- **React 19.2.4**: Latest React with Hooks
- **Vite 8.0.7**: Lightning-fast build tool
- **CSS3**: Modern CSS with variables, grid, flexbox, and 3D transforms
- **ESLint**: Clean, zero-warning codebase
- **Zero Dependencies**: No external libraries (minimal attack surface)

## 🚀 Getting Started

### Prerequisites
- Node.js 16.0.0 or higher
- npm 8.0.0 or higher

### Installation

```bash
# Clone the repository
git https://github.com/ANIKETPANWAR714/interactive_calendar.git
cd interactive_calendar

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Build for Production

```bash
npm run build

```

### Linting

```bash
npm run lint
```

## 📁 Project Structure

```
interactive-calendar/
├── src/
│   ├── App.jsx                 # Main orchestrator component (145 lines)
│   ├── index.css               # Complete styling system (700+ lines)
│   ├── main.jsx                # React entry point
│   │
│   ├── components/
│   │   ├── Calendar.jsx        # Calendar grid & month navigation
│   │   ├── Header.jsx          # Theme toggle button
│   │   ├── Hero.jsx            # Hero image & month/year display
│   │   ├── Icons.jsx           # Reusable SVG components
│   │   └── Notes.jsx           # Notes textarea with error handling
│   │
│   ├── hooks/
│   │   └── useNotes.js         # Custom hook for notes state & localStorage
│   │
│   └── utils/
│       ├── config.js           # Constants: months, days, holidays, animation durations
│       └── dateUtils.js        # Pure date utility functions (11 functions)
│
├── public/                      # Static assets
│── index.html                  # HTML template
├── package.json, vite.config.js, eslint.config.js
└── README.md
```

## 🎮 How to Use

### Selecting a Date Range
1. **Click on a date** to select the start of your range
2. **Hover over other dates** to see the preview
3. **Click another date** to complete the selection
4. Use the **Clear button** to reset the selection

### Adding Notes
- **Month Notes**: When no date is selected, add general memos for the month
- **Date Notes**: Select a single date to add a note for that specific day
- **Range Notes**: Select a date range to add a note for the entire range
- Notes are **automatically saved** to localStorage and persist across sessions

### Navigating Months
- Click the **← | →** arrows to flip through months
- Watch the smooth 3D rotation animation

### Switching Themes
- Click the **☀️/🌙** button in the header to toggle light/dark mode
- Your preference is saved to localStorage

## ✅ Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| iOS Safari | 14+ | ✅ Full |
| Android Chrome | Latest | ✅ Full |

## ♿ Accessibility

- ✅ WCAG 2.1 AA+ compliant
- ✅ Keyboard navigation (Tab, Enter)
- ✅ Screen reader friendly (proper ARIA labels and roles)
- ✅ High contrast ratios (7:1 for all text)
- ✅ Focus visible indicators (2px outline)
- ✅ Respects `prefers-reduced-motion` for users sensitive to animations

## 📊 Performance

- **Bundle Size**: 62.78 KB gzipped (JavaScript)
- **CSS Size**: 2.69 KB gzipped
- **Total**: < 65 KB gzipped
- **Build Time**: ~366ms
- **No External Dependencies**: Zero third-party library overhead

## 🎨 Customization

### Colors
Edit the CSS variables in `src/index.css` lines 1-30 to customize:
- Light theme colors: warm sunset palette
- Dark theme colors: midnight mountain palette
- Accent colors, shadows, and transitions

### Animation Speed
Modify in `src/utils/config.js`:
```javascript
export const FLIPPING_DURATION = 300;
```

### Holidays
Add or remove holidays in `src/utils/config.js` HOLIDAYS object:
```javascript
const HOLIDAYS = {
  '01-01': "New Year's Day",
  '12-25': 'Christmas Day',
};
```

## 📝 Code Quality

- **Linting**: ESLint clean - 0 errors, 0 warnings
- **Testing**: Manual testing across devices and browsers
- **Documentation**: JSDoc comments on utility functions
- **Type Safety**: Descriptive naming and logical organization


## 🐛 Troubleshooting

### Notes not saving?
- Check browser localStorage is enabled
- Clear browser cache and try again
- Check browser console for quota errors

### Animations not smooth?
- Ensure hardware acceleration is enabled in your browser
- Check if `prefers-reduced-motion` is enabled in OS settings
- Try a different browser

### Mobile layout issues?
- Clear browser cache
- Check viewport meta tag in `index.html`
- Test in device emulation mode

## 📸 Video Demonstration

- ✅ Day range selection (start, hover, end)
- ✅ Notes feature (typing, saving, switching contexts)
- ✅ Theme switching
- ✅ Month navigation with flip animation
- ✅ Mobile (320px) and desktop (1200px+) responsiveness

## 🔗 Live Demo

- GitHub Pages: [https://yourusername.github.io/interactive-calendar](https://yourusername.github.io/interactive-calendar)

## 📄 License

MIT © 2026 - Feel free to use this project for personal and commercial purposes.


---

