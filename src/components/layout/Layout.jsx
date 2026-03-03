
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import styles from './Layout.module.scss';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet /> {/* renderizado de las páginas */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;