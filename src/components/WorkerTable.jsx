import { useMemo } from 'react'
import RoleBadge from './RoleBadge'

// Fill empty mandal/sabha with the last non-empty value within same day+sabha group
function normalizeRows(rows) {
  let lastMandal = ''
  return rows.map((row, i) => {
    const prev = rows[i - 1]
    const newDay   = !prev || prev.day !== row.day
    const newSabha = newDay || prev.sabha !== row.sabha

    if (newDay || newSabha) { lastMandal = row.mandal }
    else {
      const mandal = row.mandal || lastMandal
      lastMandal = mandal
      return { ...row, mandal }
    }
    return row
  })
}

function computeSpans(rows) {
  return rows.map((row, i) => {
    const prev = rows[i - 1]

    // day: render only when day changes
    let daySpan = 0
    if (!prev || prev.day !== row.day) {
      let n = 1
      while (i + n < rows.length && rows[i + n].day === row.day) n++
      daySpan = n
    }

    // sabha: render only when day or sabha changes
    let sabhaSpan = 0
    if (!prev || prev.day !== row.day || prev.sabha !== row.sabha) {
      let n = 1
      while (
        i + n < rows.length &&
        rows[i + n].day === row.day &&
        rows[i + n].sabha === row.sabha
      ) n++
      sabhaSpan = n
    }

    // mandal: render only when day, sabha, or mandal changes
    let mandalSpan = 0
    if (!prev || prev.day !== row.day || prev.sabha !== row.sabha || prev.mandal !== row.mandal) {
      let n = 1
      while (
        i + n < rows.length &&
        rows[i + n].day === row.day &&
        rows[i + n].sabha === row.sabha &&
        rows[i + n].mandal === row.mandal
      ) n++
      mandalSpan = n
    }

    

    return { ...row, daySpan, sabhaSpan, mandalSpan }
  })
}

export default function WorkerTable({ rows }) {
  const computed = useMemo(() => computeSpans(normalizeRows(rows)), [rows])

  if (rows.length === 0) {
    return <div className="no-results">No records found.</div>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Sr.</th>
          <th>Sabha</th>
          <th>Mandal</th>
          <th>Worker Name</th>
          <th>Role</th>
          <th>Mobile</th>
        </tr>
      </thead>
      <tbody>
        {/* ── Bharuch Xetra ── */}
        <tr>
          <td className="serial-cell"></td>
          <td className="sabha-cell"></td>
          <td className="mandal-cell" rowSpan={2}>
            <span className="mandal-name">Bharuch Xetra</span>
          </td>
          <td>Dhaval Bhatt</td>
          <td>Nirdeshak</td>
          <td className="mobile-cell"><a href="tel:+918128991380">81289 91380</a></td>
        </tr>
        <tr>
          <td className="serial-cell"></td>
          <td className="sabha-cell"></td>
          <td>Dipen Patel</td>
          <td>Xetriya Karyakar</td>
          <td className="mobile-cell"><a href="tel:+919974034938">99740 34938</a></td>
        </tr>
        {computed.map((r, i) => (
          <tr key={i} data-day={r.day}>
            {r.daySpan > 0 && (
              <td className="serial-cell" rowSpan={r.daySpan}>
                {r.day}
              </td>
            )}
            {r.sabhaSpan > 0 && (
              <td className="sabha-cell" rowSpan={r.sabhaSpan}>
                {r.sabha
                  ? <span className="sabha-badge">{r.sabha}</span>
                  : <span className="dash">—</span>}
              </td>
            )}
            {r.mandalSpan > 0 && (
              <td className="mandal-cell" rowSpan={r.mandalSpan}>
                {r.mandal
                  ? <span className="mandal-name">{r.mandal}</span>
                  : <span className="dash">—</span>}
              </td>
            )}
            <td>{r.name}</td>
            <td><RoleBadge role={r.role} /></td>
            <td className="mobile-cell">
              <a href={`tel:${r.mobile}`}>{r.mobile}</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
