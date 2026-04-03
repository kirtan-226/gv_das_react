export default function XetraBar() {
  const contacts = [
    { name: 'Dipen Patel',  mobile: '+919974034938',  display: '+91 99740 34938' },
    { name: 'Dhaval Bhatt', mobile: '+918128991380',  display: '+91 81289 91380' },
  ]

  return (
    <div className="xetra-bar">
      <span className="xetra-label">Bharuch Xetra</span>
      <div className="xetra-contacts">
        {contacts.map(c => (
          <div key={c.name} className="xetra-contact">
            <span className="xetra-name">{c.name}</span>
            <a href={`tel:${c.mobile}`} className="xetra-mobile">{c.display}</a>
          </div>
        ))}
      </div>
    </div>
  )
}
