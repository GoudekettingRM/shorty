import Head from 'next/head';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Shorties</title>
      </Head>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
