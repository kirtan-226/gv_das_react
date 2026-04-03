export default function YuvatiTable({ rows }) {
  if (rows.length === 0) {
    return <div className="no-results">No records found.</div>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Sr.</th>
          <th>Mandal</th>
          <th>Sanchalak</th>
          <th>Sanchalak Mobile</th>
          <th>Nirishak</th>
          <th>Nirishak Mobile</th>
          <th>Address</th>
          <th>Sabha Day</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(r => (
          <tr key={r.srNo}>
            <td className="serial-cell">{r.srNo}</td>
            <td><span className="mandal-name">{r.mandal}</span></td>
            <td>{r.sanchalak}</td>
            <td className="mobile-cell">
              <a href={`tel:+91${r.sanchalakMobile}`}>{r.sanchalakMobile}</a>
            </td>
            <td>{r.nirishak}</td>
            <td className="mobile-cell">
              <a href={`tel:+91${r.nirishakMobile}`}>{r.nirishakMobile}</a>
            </td>
            <td>{r.address}</td>
            <td>
              <span className="sabha-badge">{r.sabhaDay}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
