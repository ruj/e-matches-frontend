import { useState } from 'react'
import Flag from 'react-flagkit'

import { useRouter } from 'next/router'

import Button from '@components/Button'
import Layout from '@components/Layout'
import Modal from '@components/Modal'
import NoMatchesFound from '@components/NoMatchesFound'
import { useFetch } from '@hooks/useFetch'
import { Countries, MatchStatus } from '@utils/Constants'

export default function Team () {
  const router = useRouter()
  const { id } = router.query
  const [form, setForm] = useState({})
  const { data: arena } = useFetch(`/arenas/${id}`)
  const { data: matches } = useFetch(`/arenas/${id}/games`)

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await fetch(`/api/arenas/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then((response) => response.json())
      .then(() => (window.location.href = `/arenas/${id}`))
  }

  const handleDelete = (event) => {
    event.preventDefault()

    console.log('Arena deletada')

    window.location.href = '/arenas'
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-center mx-20 space-x-10">
        <Modal
          options={{
            title: 'Atualizar Arena',
            button: { color: 'blue', value: 'Atualizar' }
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex flex-col space-y-1.5">
                <label>Nome</label>
                <input
                  type="text"
                  name="name"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  maxLength={64}
                  defaultValue={arena?.name}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>Endereço</label>
                <input
                  type="text"
                  name="address"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  maxLength={64}
                  defaultValue={arena?.address}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>País</label>
                <input
                  type="text"
                  name="country"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  maxLength={2}
                  defaultValue={arena?.country}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>Ano de Inauguração</label>
                <input
                  type="text"
                  name="opening_at"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  maxLength={4}
                  defaultValue={arena?.opening_at}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
            </div>
            <div className="flex justify-center mt-5 space-x-5">
              <Button color="blue" value="Atualizar" />
            </div>
          </form>
        </Modal>
        <Modal
          options={{
            title: 'Deletar Arena',
            button: { color: 'red', value: 'Deletar' }
          }}
        >
          <div className="flex flex-col justify-center items-center">
            <div className="mb-5 text-center">
              Tem certeza que deseja deletar <strong>{arena?.name}</strong>?
            </div>
            <Button color="gray" value="Sim!" onClick={handleDelete} />
          </div>
        </Modal>
      </div>
      <div className="flex flex-col justify-center mx-20">
        <div className="border-b-2 border-white/5 bg-zinc-800/50">
          <h2 className="h-10 flex justify-center items-center text-xl font-bold">
            {arena?.name}
          </h2>
        </div>
        <div className="h-32 grid grid-cols-10">
          <div className="flex items-center col-span-3 px-4 bg-zinc-800/30">
            Endereço
          </div>
          <div className="flex items-center col-span-7 px-4 bg-zinc-800/10 border-l-2 border-white/5">
            {arena?.address}
          </div>
          <div className="flex items-center col-span-3 px-4 bg-zinc-800/30">
            País
          </div>
          <div className="flex items-center col-span-7 px-4 bg-zinc-800/10 border-l-2 border-white/5">
            <div className="flex">
              <Flag
                className="m-auto"
                country={arena?.country}
                size={28}
                title={Countries[arena?.country]}
              />
              <span className="ml-1.5">{Countries[arena?.country]}</span>
            </div>
          </div>
          <div className="flex items-center col-span-3 px-4 bg-zinc-800/30">
            Aberto em
          </div>
          <div className="flex items-center col-span-7 px-4 bg-zinc-800/10 border-l-2 border-white/5">
            {arena?.opening_at}
          </div>
        </div>
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
          {matches && (
            <tbody className="bg-zinc-800/10">
              {matches?.map((match, index) => (
                <tr
                  key={index}
                  className="h-10 text-center hover:bg-zinc-800/50 divide-x-2 divide-white/5"
                >
                  <td>{index + 1}</td>
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
              ))}
            </tbody>
          )}
        </table>
        {!matches?.length && <NoMatchesFound />}
      </div>
    </div>
  )
}

Team.getLayout = (page) => {
  return <Layout>{page}</Layout>
}
