import SearchIcon from './SearchIcon'
import PrintIcon from './PrintIcon'

export default function Toolbar({ query, onQueryChange }) {
  return (
    <div className="toolbar">
      <div className="search-wrap">
        <span className="search-icon"><SearchIcon /></span>
        <input
          className="search-input"
          type="text"
          placeholder="Name / Phone / Mandal..."
          value={query}
          onChange={e => onQueryChange(e.target.value)}
        />
      </div>
      <button className="print-btn" onClick={() => window.print()}>
        <PrintIcon /> Print / PDF
      </button>
    </div>
  )
}
