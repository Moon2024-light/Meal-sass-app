'use client';

import Link from 'next/link';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div
        className={styles.logo}
        style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'black',
        }}
      >
        <span>🍽️</span> 
        <span>CraveCatcher</span>
      </div>
      <nav className={styles.nav}>
        <Link href="#contact" style={{ color: 'black', fontWeight: 600 }}>
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Header;
