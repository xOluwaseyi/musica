import "../styles/globals.css";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import { SongContextProvider } from "../context";

import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {

  return (
    <>
      <SongContextProvider>
        <Layout>
          <Head>
            <title>Musica</title>
            <meta
              name="description"
              content="Discover and play your favourite songs on Musica."
            />
            <link rel="icon" href="/musica-logo.png" />
          </Head>

          <NextNProgress />
          <Component {...pageProps} />
        </Layout>
      </SongContextProvider>
    </>
  );
}

export default MyApp;
