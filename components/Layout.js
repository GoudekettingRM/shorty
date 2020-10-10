import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div style={BodyStyle}>
      <Head>
        <title>Shorties</title>
      </Head>
      <Header />
      <main style={MainStyle}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

const BodyStyle = {
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
};
const MainStyle = {
  flex: '1 0 auto',
  display: 'flex',
  alignItems: 'center',
};
