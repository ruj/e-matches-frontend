import { ReactNode } from 'react'

import Footer from './Footer'
import Header from './Header'

export default function Layout ({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex flex-col justify-between xl:px-24 2xl:px-[48rem] overflow-x-hidden scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-700">
      <Header />
      <div className="mb-auto">{children}</div>
      <Footer />
    </div>
  )
}
