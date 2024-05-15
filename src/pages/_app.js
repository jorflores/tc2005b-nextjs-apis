import "@/styles/globals.css";
import Navbar from '../pages/components/Navbar';

export default function App({ Component, pageProps }) {
  return <><Navbar user={pageProps.user} /><Component {...pageProps} /></>
}
