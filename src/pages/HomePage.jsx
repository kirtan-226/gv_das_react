import { useState, useMemo } from 'react'
import { rows, yuvatiRows, DAYS, YUVATI_DAYS } from '../data'
import Header from '../components/Header'
import Toolbar from '../components/Toolbar'
import Tabs from '../components/Tabs'
import KaryakarTable from '../components/KaryakarTable'
import Footer from '../components/Footer'

export default function HomePage() {
  const [mandalType, setMandalType] = useState('yuvak')
  const [activeDay, setActiveDay]   = useState('all')
  const [query, setQuery]           = useState('')

  const activeRows = mandalType === 'yuvak' ? rows : yuvatiRows
  const activeDays = mandalType === 'yuvak' ? DAYS : YUVATI_DAYS

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return activeRows.filter(r => {
      const dayOk    = activeDay === 'all' || String(r.day) === activeDay
      const searchOk = !q || [r.mandal, r.name, r.mobile, r.role, r.sabha]
        .some(v => v.toLowerCase().includes(q))
      return dayOk && searchOk
    })
  }, [activeRows, activeDay, query])

  function handleToggle(type) {
    setMandalType(type)
    setActiveDay('all')
    setQuery('')
  }

  return (
    <div className="card">
      <Header />
      <div className="mandal-toggle-bar">
        <button
          className={`mandal-toggle-btn ${mandalType === 'yuvak' ? 'active' : ''}`}
          onClick={() => handleToggle('yuvak')}
        >
          Yuvak Mandal
        </button>
        <button
          className={`mandal-toggle-btn ${mandalType === 'yuvati' ? 'active' : ''}`}
          onClick={() => handleToggle('yuvati')}
        >
          Yuvati Mandal
        </button>
      </div>
      <Toolbar query={query} onQueryChange={setQuery} />
      <Tabs activeDay={activeDay} onDayChange={setActiveDay} days={activeDays} />
      <div className="table-wrap">
        <KaryakarTable rows={filtered} showXetra={mandalType === 'yuvak'} />
      </div>
      <Footer />
    </div>
  )
}
