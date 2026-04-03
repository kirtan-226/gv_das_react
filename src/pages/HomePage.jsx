import { useState, useMemo } from 'react'
import { rows } from '../data'
import Header from '../components/Header'
import Toolbar from '../components/Toolbar'
import Tabs from '../components/Tabs'
import WorkerTable from '../components/WorkerTable'
import Footer from '../components/Footer'

export default function HomePage() {
  const [activeDay, setActiveDay] = useState('all')
  const [query, setQuery]         = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rows.filter(r => {
      const dayOk    = activeDay === 'all' || String(r.day) === activeDay
      const searchOk = !q || [r.mandal, r.name, r.mobile, r.role, r.sabha]
        .some(v => v.toLowerCase().includes(q))
      return dayOk && searchOk
    })
  }, [activeDay, query])

  return (
    <div className="card">
      <Header />
      <Toolbar query={query} onQueryChange={setQuery} />
      <Tabs activeDay={activeDay} onDayChange={setActiveDay} />
      <div className="table-wrap">
        <WorkerTable rows={filtered} />
      </div>
      <Footer />
    </div>
  )
}
