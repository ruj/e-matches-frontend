import Marquee from 'react-fast-marquee'

import Link from 'next/link'

import { Menu } from '@utils/Constants'

const matches = Array(3).fill('Match')

export default function Header () {
  return (
    <div className="h-60 sm:h-72 flex flex-col justify-between items-center mb-5 px-16">
      <div className="w-full flex flex-col">
        <h1 className="h-16 sm:h-32 flex justify-center items-center text-5xl sm:text-6xl font-black tracking-tighter uppercase">
          <Link href="/">E-Matches</Link>
        </h1>
        <nav className="h-12 flex justify-between text-center text-zinc-300/70">
          {Menu.map(({ path, title }, index) => (
            <Link
              key={index}
              className="w-full flex justify-center items-center font-semibold uppercase"
              href={path}
            >
              {title}
            </Link>
          ))}
        </nav>
        {false && (
          <Marquee
            className="h-10 mt-5 bg-zinc-800/10 z-0"
            pauseOnHover={true}
            speed={50}
            gradientColor={[24, 24, 27]}
            gradientWidth={25}
          >
            <div className="flex space-x-16">
              {matches.map((match, index) => (
                <span
                  key={index}
                  className="hover:scale-110 duration-150 hover:text-zinc-400 cursor-pointer"
                >
                  {match}
                </span>
              ))}
            </div>
          </Marquee>
        )}
      </div>
    </div>
  )
}
