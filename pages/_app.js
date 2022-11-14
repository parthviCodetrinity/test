import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import store from './redux/store/store'
import { createWrapper } from 'next-redux-wrapper'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  console.log(pageProps);
  return (
    <>
     
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
     
    </>
  )
}
const makeStore = () => store
const wrapper = createWrapper(makeStore)
export default wrapper.withRedux(MyApp)
