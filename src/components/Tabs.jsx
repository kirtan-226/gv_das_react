import { DAYS } from '../data'

export default function Tabs({ activeDay, onDayChange }) {
  return (
    <nav className="tabs">
      <button
        className={`tab-btn ${activeDay === 'all' ? 'active' : ''}`}
        onClick={() => onDayChange('all')}
      >
        All
      </button>
      {DAYS.map(d => (
        <button
          key={d.id}
          className={`tab-btn ${activeDay === String(d.id) ? 'active' : ''}`}
          onClick={() => onDayChange(String(d.id))}
        >
          {d.label}
        </button>
      ))}
    </nav>
  )
}
