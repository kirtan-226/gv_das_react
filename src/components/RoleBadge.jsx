export default function RoleBadge({ role }) {
  if (!role) return null
  const cls =
    role === 'nirikshak' ? 'role-nirikshak'
    : role === 'sanchalak' ? 'role-sachaalk'
    : 'role-other'
  return <span className={`role-badge ${cls}`}>{role}</span>
}
