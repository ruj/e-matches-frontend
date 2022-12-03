import { useState } from 'react'
import Flag from 'react-flagkit'
import { CgExternal } from 'react-icons/cg'

import Image from 'next/image'
import { useRouter } from 'next/router'

import ms from 'ms'

import Button from '@components/Button'
import Layout from '@components/Layout'
import Modal from '@components/Modal'
import { useFetch } from '@hooks/useFetch'
import { IMatch } from '@interfaces'
import { Countries, MatchStatus } from '@utils/Constants'

export default function Team () {
  const router = useRouter()
  const { id } = router.query
  const [form, setForm] = useState({} as IMatch)
  const { data: match } = useFetch(`/matches/${id}/details`)

  const teamOne = match?.first_team
  const teamTwo = match?.second_team
  const winnerTeam = (team) => match?.winning_team?.id === team?.id

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await fetch(`/api/matches/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then((response) => response.json())
      .then(async () => {
        if (form?.winning_team_id) {
          await Promise.allSettled(
            [match?.first_team?.id, match?.second_team?.id].map(
              (teamId, index) =>
                setTimeout(async () => {
                  const team = await fetch(`/api/teams/${teamId}`).then(
                    (response) => response.json()
                  )

                  console.log(team, form)
                  console.log(teamId)

                  await fetch(`/api/teams/${teamId}`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                      +form?.winning_team_id === teamId
                        ? { wins: team?.wins + 1 }
                        : { defeats: team?.defeats + 1 }
                    )
                  })
                }, index * 250)
            )
          )
          .then(() => (window.location.href = `/matches/${id}`))
        }
      })
  }

  const handleDelete = (event) => {
    event.preventDefault()

    console.log('Match deletada')

    window.location.href = '/matches'
  }

  return (
    <div className="space-y-10">
      <div className="flex justify-center mx-20 space-x-10">
        <Modal
          options={{
            title: 'Atualizar Partida',
            button: { color: 'blue', value: 'Atualizar' }
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex flex-col space-y-1.5">
                <label>Título</label>
                <input
                  type="text"
                  name="title"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  maxLength={64}
                  defaultValue={match?.title}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>ID da Arena</label>
                <input
                  type="text"
                  name="arena_id"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  defaultValue={match?.arena?.id}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>ID da Primeira Equipe</label>
                <input
                  type="text"
                  name="first_team_id"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  defaultValue={match?.first_team?.id}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>ID da Segunda Equipe</label>
                <input
                  type="text"
                  name="second_team_id"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  defaultValue={match?.second_team?.id}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>Data do Evento</label>
                <input
                  type="text"
                  name="event_date"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  defaultValue={match?.event_date}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>Horário do Evento</label>
                <input
                  type="text"
                  name="start_in"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  defaultValue={match?.start_in?.replace(/\.\d+/, '')}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>Duração do Evento</label>
                <input
                  type="text"
                  name="duration"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  defaultValue={match?.duration}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>ID da Equipe Vitoriosa</label>
                <input
                  type="text"
                  name="winning_team_id"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  defaultValue={match?.winning_team?.id}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>Status</label>
                <input
                  type="text"
                  name="status"
                  className="h-8 px-2 bg-zinc-800/30 outline-none"
                  defaultValue={match?.status}
                  onChange={handleChange}
                  autoComplete="chrome-off"
                />
              </div>
            </div>
            <div className="flex justify-center mt-5 space-x-5">
              <Button color="green" value="Atualizar" />
            </div>
          </form>
        </Modal>
        <Modal
          options={{
            title: 'Deletar Partida',
            button: { color: 'red', value: 'Deletar' }
          }}
        >
          <div className="flex flex-col justify-center items-center">
            <div className="mb-5 text-center">
              Tem certeza que deseja deletar <strong>{match?.title}</strong>?
            </div>
            <Button color="gray" value="Sim!" onClick={handleDelete} />
          </div>
        </Modal>
      </div>
      <div className="flex flex-col justify-center mx-5 sm:mx-20">
        <div className="border-b-2 border-white/5 bg-zinc-800/50">
          <h2 className="h-10 flex justify-center items-center text-xl font-bold">
            {match?.title}
          </h2>
        </div>
        <div className="grid grid-cols-11 mt-5">
          <div className="flex justify-end cols-span-5 col-start-1 col-end-5">
            <div className="flex items-center w-32 h-32">
              {teamOne && (
                <Image
                  src={teamOne?.icon || '/images/jpg/not_found.jpg'}
                  width={256}
                  height={256}
                  draggable={false}
                  onContextMenu={(event) => event.preventDefault()}
                  alt={teamOne?.name}
                  // layout="responsive"
                />
              )}
            </div>
          </div>
          <div className="flex cols-span-3 col-start-5 col-end-8">
            <h3 className="w-fit h-full flex items-center mx-auto text-6xl font-black">
              VS
            </h3>
          </div>
          <div className="flex cols-span-5 col-start-8 col-end-11">
            <div className="flex items-center w-32 h-32">
              {teamTwo && (
                <Image
                  src={teamTwo?.icon || '/images/jpg/not_found.jpg'}
                  width={256}
                  height={256}
                  draggable={false}
                  onContextMenu={(event) => event.preventDefault()}
                  alt={teamTwo?.name}
                  // layout="responsive"
                />
              )}
            </div>
          </div>
        </div>
        <div className="h-36 grid grid-cols-11 my-5">
          <div className="flex justify-end cols-span-5 col-start-1 col-end-5">
            <div className="w-full h-full flex flex-col mr-2.5">
              <div className="h-2/6 flex justify-end items-center">
                <a
                  href={`/teams/${teamOne?.id}`}
                  className="flex hover:text-zinc-400"
                >
                  {teamOne?.name}
                  <CgExternal />
                </a>
              </div>
              <div className="h-2/6 flex justify-end items-center">
                <div className="flex">
                  <span className="mr-1.5">{Countries[teamOne?.country]}</span>
                  <Flag
                    className="m-auto"
                    country={teamOne?.country}
                    size={28}
                    title={Countries[teamOne?.country]}
                  />
                </div>
              </div>
              <div className="h-2/6 flex justify-end items-center">
                {winnerTeam(teamOne) ? 1 : 0}
              </div>
            </div>
          </div>
          <div className="flex cols-span-3 col-start-5 col-end-8 bg-zinc-800/25">
            <div className="w-full h-full flex flex-col">
              <div className="h-2/6 flex justify-center items-center">
                <h3 className="text-xl font-extrabold">Nome</h3>
              </div>
              <div className="h-2/6 flex justify-center items-center">
                <h3 className="text-xl font-extrabold">País</h3>
              </div>
              <div className="h-2/6 flex justify-center items-center">
                <h3 className="text-xl font-extrabold">Resultado</h3>
              </div>
            </div>
          </div>
          <div className="flex cols-span-5 col-start-8 col-end-11">
            <div className="w-full h-full flex flex-col ml-2.5 ">
              <div className="h-2/6 flex items-center">
                <a
                  href={`/teams/${teamTwo?.id}`}
                  className="flex hover:text-zinc-400"
                >
                  {teamTwo?.name}
                  <CgExternal />
                </a>
              </div>
              <div className="h-2/6 flex items-center">
                <div className="flex">
                  <Flag
                    className="m-auto"
                    country={teamTwo?.country}
                    size={28}
                    title={Countries[teamTwo?.country]}
                  />
                  <span className="ml-1.5">{Countries[teamTwo?.country]}</span>
                </div>
              </div>
              <div className="h-2/6 flex items-center">
                {winnerTeam(teamTwo) ? 1 : 0}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-5">
          <div className="h-32 grid grid-cols-10">
            <div className="flex items-center col-span-3 px-4 bg-zinc-800/30">
              Arena
            </div>
            <div className="flex items-center col-span-7 px-4 bg-zinc-800/10 border-l-2 border-white/5">
              <a
                href={`/arenas/${match?.arena?.id}`}
                className="flex hover:text-zinc-400"
              >
                {match?.arena?.name}
                <CgExternal />
              </a>
            </div>
            <div className="flex items-center col-span-3 px-4 bg-zinc-800/30">
              Status
            </div>
            <div className="flex items-center col-span-7 px-4 bg-zinc-800/10 border-l-2 border-white/5">
              {MatchStatus[match?.status]}
            </div>
            <div className="flex items-center col-span-3 px-4 bg-zinc-800/30">
              Data
            </div>
            <div className="flex items-center col-span-7 px-4 bg-zinc-800/10 border-l-2 border-white/5">
              {new Date(match?.event_date).toLocaleDateString('pt-BR')}
            </div>
          </div>
          <div className="h-32 grid grid-cols-10">
            <div className="flex items-center col-span-3 px-4 bg-zinc-800/30">
              Vencedor
            </div>
            <div className="flex items-center col-span-7 px-4 bg-zinc-800/10 border-l-2 border-white/5">
              {match?.winning_team?.id ? (
                <a
                  href={`/teams/${match?.winning_team?.id}`}
                  className="flex hover:text-zinc-400"
                >
                  {match?.winning_team?.name}
                  <CgExternal />
                </a>
              ) : (
                'N/A'
              )}
            </div>
            <div className="flex items-center col-span-3 px-4 bg-zinc-800/30">
              Iniciada em
            </div>
            <div className="flex items-center col-span-7 px-4 bg-zinc-800/10 border-l-2 border-white/5">
              {match?.start_in?.replace(/\.\d+/, '')}
            </div>
            <div className="flex items-center col-span-3 px-4 bg-zinc-800/30">
              Duração
            </div>
            <div className="flex items-center col-span-7 px-4 bg-zinc-800/10 border-l-2 border-white/5">
              {match?.duration ? ms(match?.duration * 1e3) : 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Team.getLayout = (page) => {
  return <Layout>{page}</Layout>
}
