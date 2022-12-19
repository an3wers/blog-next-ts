import type { AppProps } from 'next/app'
import '../assets/styles/main.scss'
export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
