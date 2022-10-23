import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '@shared/states/store';
import GoogleAnalytics from '@shared/components/GoogleAnalytics';

function MyApp({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <GoogleAnalytics />
    <Component {...pageProps} />
  </Provider>
}

export default MyApp
