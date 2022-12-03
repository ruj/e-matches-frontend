import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
        </Head>
        <body className="text-zinc-300 bg-zinc-900 font-rubik">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
