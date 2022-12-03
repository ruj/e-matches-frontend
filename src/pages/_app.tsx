import { NextComponentType, NextPageContext } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import '../styles/globals.css'

type CustomAppProps = AppProps & {
  Component: NextComponentType<NextPageContext, any, any> & {
    getLayout: () => void
  }
}

export default function MyApp ({ Component, pageProps }: CustomAppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}
