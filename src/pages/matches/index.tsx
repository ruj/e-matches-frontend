import { useState } from 'react'

import Button from '@components/Button'
import Layout from '@components/Layout'
import Modal from '@components/Modal'
import { useFetch } from '@hooks/useFetch'
import { MatchStatus } from '@utils/Constants'

export default function Matches () {
  const [form, setForm] = useState({})
  const { data } = useFetch('/matches')

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await fetch('/api/matches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then((response) => response.json())
      .then((id) => (window.location.href = `/matches/${id}`))
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-center mx-20 space-x-10">
        <Modal
          options={{
            title: 'Registrar Partida',
            button: { color: 'green', value: 'Registrar' }
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex flex-col space-y-1.5">
                <label>
                  Título <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  maxLength={64}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>
                  ID da Arena <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="arena_id"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>
                  ID da Primeira Equipe <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="first_team_id"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>
                  ID da Segunda Equipe <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="second_team_id"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>
                  Data do Evento <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="event_date"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>
                  Horário do Evento <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="start_in"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>
                  Duração do Evento <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="duration"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
            </div>
            <div className="flex justify-center mt-5 space-x-5">
              <Button color="green" value="Registrar" />
            </div>
          </form>
        </Modal>
      </div>
      <div className="flex flex-col justify-center mx-20">
        <table>
          <thead className="bg-zinc-800/50">
            <tr className="h-10 text-center text-xl border-b-2 border-white/5 divide-x-2 divide-white/5 title">
              <th className="w-14">#</th>
              <th>Partida</th>
              <th className="w-36">Status</th>
              <th className="w-32">Data</th>
            </tr>
          </thead>
          <tbody className="bg-zinc-800/10">
            {data
              ?.map((match) => (
                <tr
                  key={match.id}
                  className="h-10 text-center hover:bg-zinc-800/50 divide-x-2 divide-white/5"
                >
                  <td>{match.id}</td>
                  <td className="pl-5 text-left">
                    <a href={`/matches/${match.id}`}>
                      <div>{match.title}</div>
                    </a>
                  </td>
                  <td>{MatchStatus[match.status]}</td>
                  <td>
                    {new Date(match.event_date).toLocaleDateString('pt-BR')}
                  </td>
                </tr>
              ))
              .sort(
                (a, b) =>
                  new Date(b.event_date).valueOf() -
                  new Date(a.event_date).valueOf()
              )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

Matches.getLayout = (page) => {
  return <Layout>{page}</Layout>
}
