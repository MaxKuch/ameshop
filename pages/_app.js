import '../styles/globals.scss'
import Head from 'next/head'
import NextNProgress from 'nextjs-progressbar'
import store from '../redux/store'
import { Provider } from 'react-redux'


function MyApp({ Component, pageProps }) {
  return (
      <>
        <Head>
          <title>Amemusic</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="preload" href='/fonts/JosefinSans/JosefinSans-SemiBold.ttf' as="font" crossOrigin=""/>
          <link rel="preload" href='/fonts/Montserrat/Montserrat-Bold.ttf' as="font" crossOrigin=""/>
          <link rel="preload" href='/fonts/Montserrat/Montserrat-Medium.ttf' as="font" crossOrigin=""/>
          <link rel="preload" href='/fonts/Montserrat/Montserrat-Regular.ttf' as="font" crossOrigin=""/>
          <link rel="preload" href='/fonts/MontserratAlternates/MontserratAlternates-Regular.ttf' as="font" crossOrigin=""/>
        </Head>
        <NextNProgress
          color="#31B5FF"
          options={{ showSpinner: false }}
          
        />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </> 
  )
}

export default MyApp
