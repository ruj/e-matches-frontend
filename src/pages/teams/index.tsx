import { useState } from 'react'
import Flag from 'react-flagkit'

import Button from '@components/Button'
import Layout from '@components/Layout'
import Modal from '@components/Modal'
import { useFetch } from '@hooks/useFetch'
import { Countries } from '@utils/Constants'

export default function Teams () {
  const [form, setForm] = useState({})
  const { data } = useFetch('/teams')

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await fetch('/api/teams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then((response) => response.json())
      .then((id) => (window.location.href = `/teams/${id}`))
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-center mx-20 space-x-10">
        <Modal
          options={{
            title: 'Adicionar Equipe',
            button: { color: 'green', value: 'Adicionar' }
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex flex-col space-y-1.5">
                <label>Nome <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="name"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  maxLength={64}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>Icone</label>
                <input
                  type="text"
                  name="icon"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>País <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="country"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  maxLength={2}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>Jogador Um <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="player_one"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  maxLength={32}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>Jogador Dois <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="player_two"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  maxLength={32}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>Jogador Três <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="player_three"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  maxLength={32}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>Jogador Quatro <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="player_four"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  maxLength={32}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>Jogador Cinco <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="player_five"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  maxLength={32}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>Suporte</label>
                <input
                  type="text"
                  name="player_support"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  maxLength={32}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>{'Treinador(a)'}</label>
                <input
                  type="text"
                  name="coach"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  maxLength={32}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
            </div>
            <div className="flex justify-center mt-5 space-x-5">
              <Button color="green" value="Adicionar" />
            </div>
          </form>
        </Modal>
      </div>
      <div className="flex flex-col justify-center mx-20">
        <table>
          <thead className="bg-zinc-800/50">
            <tr className="h-10 text-center text-xl border-b-2 border-white/5 divide-x-2 divide-white/5 title">
              <th className="w-14">#</th>
              <th>Nome</th>
              <th className="w-20">País</th>
              <th className="w-28">Vitórias</th>
              <th className="w-28">Partidas</th>
            </tr>
          </thead>
          <tbody className="bg-zinc-800/10">
            {data
              ?.map((team, index) => (
                <tr
                  key={team.id}
                  className="h-10 text-center hover:bg-zinc-800/50 divide-x-2 divide-white/5"
                >
                  <td>{index + 1}</td>
                  <td className="pl-5 text-left">
                    <a href={`/teams/${team.id}`}>
                      <div>{team.name}</div>
                    </a>
                  </td>
                  <td>
                    <Flag
                      className="m-auto"
                      country={team.country}
                      size={28}
                      title={Countries[team.country]}
                    />
                  </td>
                  <td>{team.wins}</td>
                  <td>{team.wins + team.defeats}</td>
                </tr>
              ))
              .sort((a, b) => a.wins - b.wins)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

Teams.getLayout = (page) => {
  return <Layout>{page}</Layout>
}
