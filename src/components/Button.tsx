const colors = {
  green: 'bg-green-600 hover:bg-green-700',
  blue: 'bg-blue-700 hover:bg-blue-800',
  red: 'bg-red-600 hover:bg-red-700',
  gray: 'bg-zinc-700 hover:bg-zinc-800'
}

export default function Button ({
  color,
  value,
  onClick
}: {
  color: string
  value: string
  onClick?
}) {
  return (
    <button
      className={`px-20 py-2 font-semibold ` + colors[color]}
      onClick={onClick}
    >
      <h3>{value}</h3>
    </button>
  )
}
