import { useState } from 'react'
import Flag from 'react-flagkit'
import Avatar from 'react-nice-avatar'

import Image from 'next/image'
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
  const { data: team } = useFetch(`/teams/${id}`)
  const { data: matches } = useFetch(`/teams/${id}/games`)

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await fetch(`/api/teams/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then((response) => response.json())
      .then(() => (window.location.href = `/teams/${id}`))
  }

  const handleDelete = (event) => {
    event.preventDefault()

    console.log('Equipe deletada')

    window.location.href = '/teams'
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-center mx-20 space-x-10">
        <Modal
          options={{
            title: 'Atualizar Equipe',
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
                  defaultValue={team?.name}
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
                  defaultValue={team?.icon}
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
                  defaultValue={team?.country}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>Jogador Um</label>
                <input
                  type="text"
                  name="player_one"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  maxLength={32}
                  defaultValue={team?.player_one}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>Jogador Dois</label>
                <input
                  type="text"
                  name="player_two"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  maxLength={32}
                  defaultValue={team?.player_two}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>Jogador Três</label>
                <input
                  type="text"
                  name="player_three"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  maxLength={32}
                  defaultValue={team?.player_three}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>Jogador Quatro</label>
                <input
                  type="text"
                  name="player_four"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  maxLength={32}
                  defaultValue={team?.player_four}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>Jogador Cinco</label>
                <input
                  type="text"
                  name="player_five"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  maxLength={32}
                  defaultValue={team?.player_five}
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
                  defaultValue={team?.player_support}
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
                  defaultValue={team?.coach}
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
            title: 'Deletar Equipe',
            button: { color: 'red', value: 'Deletar' }
          }}
        >
          <div className="flex flex-col justify-center items-center">
            <div className="mb-5 text-center">
              Tem certeza que deseja deletar <strong>{team?.name}</strong>?
            </div>
            <Button color="gray" value="Sim!" onClick={handleDelete} />
          </div>
        </Modal>
      </div>
      <div className="flex flex-col justify-center mx-20">
        <div className="border-b-2 border-white/5 bg-zinc-800/50">
          <h2 className="h-10 flex justify-center items-center text-xl font-bold">
            {team?.name}
          </h2>
        </div>
        <div className="flex">
          <div className="my-5 pr-4">
            <div className="min-w-32 w-32 min-w-32 h-fit m-5">
              {team && (
                <Image
                  src={team?.icon || '/images/jpg/not_found.jpg'}
                  width={256}
                  height={256}
                  draggable={false}
                  onContextMenu={(event) => event.preventDefault()}
                  alt={team?.name}
                  // layout="responsive"
                />
              )}
            </div>
            <div className="flex justify-center mt-10 space-x-2">
              <Flag country={team?.country} size={32} />
              <div>{Countries[team?.country]}</div>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 grid-flow-col mt-5">
              <div className="m-auto text-sm">Vitórias</div>
              <div className="mx-auto text-2xl">{team?.wins}</div>
              <div className="m-auto text-sm">Derrotas</div>
              <div className="mx-auto text-2xl">{team?.defeats}</div>
            </div>
          </div>
          <div className="w-full flex flex-col my-auto pl-4 pr-8 py-2.5 border-l border-zinc-800/50">
            <div className="grid grid-cols-5 gap-1 grid-flow-col">
              {team &&
                Object.entries(team)
                  .filter(
                    ([key]) =>
                      key.startsWith('player_') && key !== 'player_support'
                  )
                  .map(([key, value]) => ({ name: key, playerName: value }))
                  .map(({ playerName }: { [key: string]: any }, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center space-y-3"
                    >
                      <Avatar className="w-28 h-28" sex="man" />
                      <div className="w-11/12 h-10 flex justify-center p-2 bg-zinc-800/25">
                        {playerName}
                      </div>
                    </div>
                  ))}
            </div>
            <div
              className={`flex mt-7 px-64 md:px-14 lg:px-24 text-center ${
                team?.player_support ? 'justify-between' : 'justify-center'
              }`}
            >
              {team?.coach && (
                <div>
                  <h3 className="text-lg">Treinador(a)</h3>
                  <span>{team?.coach}</span>
                </div>
              )}
              {team?.player_support && (
                <div>
                  <h3 className="text-lg">Suporte</h3>
                  <span>{team.player_support}</span>
                </div>
              )}
            </div>
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
              <th className="w-32">Resultado</th>
            </tr>
          </thead>
          {matches && (
            <tbody className="bg-zinc-800/10">
              {matches
                ?.map((match, index) => (
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
                    {match.status === 'F' ? (
                      match.winning_team_id === team?.id ? (
                        <td className="bg-green-500/20">Vitória</td>
                      ) : (
                        <td className="bg-red-600/20">Derrota</td>
                      )
                    ) : (
                      <></>
                    )}
                  </tr>
                ))
                .sort(
                  (a, b) =>
                    new Date(b.event_date).valueOf() -
                    new Date(a.event_date).valueOf()
                )}
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
