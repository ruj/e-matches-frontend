import Link from 'next/link'

import Layout from '@components/Layout'

export default function Index () {
  return (
    <div className="flex flex-col items-center mx-52 space-y-2">
      <div className="w-full flex justify-start items-center p-5 pl-32 bg-zinc-800/5 hover:bg-zinc-800/25 space-x-10 transition delay-75 ease-in hover:scale-105 fade-in fade-duration-1000">
        <span className="text-9xl font-black">1</span>
        <p className="text-2xl">
          Escale seu{' '}
          <Link href="/teams">
            <strong className="hover:text-zinc-400 underline">time</strong>
          </Link>
          .
        </p>
      </div>
      <div className="w-full flex justify-center items-center p-5 bg-zinc-800/5 hover:bg-zinc-800/25 space-x-10 transition delay-75 ease-in hover:scale-105 fade-in fade-duration-2000">
        <span className="text-9xl font-black">2</span>
        <p className="text-2xl">
          Adicione uma{' '}
          <Link href="/arenas">
            <strong className="hover:text-zinc-400 underline">arena</strong>
          </Link>
          .
        </p>
      </div>
      <div className="w-full flex justify-end items-center p-5 pr-32 bg-zinc-800/5 hover:bg-zinc-800/25 space-x-10 transition delay-75 ease-in hover:scale-105 fade-in fade-duration-3000">
        <span className="text-9xl font-black">3</span>
        <p className="text-2xl">
          Crie uma{' '}
          <Link href="/matches">
            <strong className="hover:text-zinc-400 underline">partida</strong>
          </Link>
          !
        </p>
      </div>
    </div>
  )
}

Index.getLayout = (page) => {
  return <Layout>{page}</Layout>
}
