import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import universidade from '/imges/universidade.png';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <img src={universidade} className={styles.logo} alt="logo" />
      <ul className={styles.lista}>
        <li>
          <Link to="/salas" className={`${styles.link} ${location.pathname === '/salas' ? styles.active : ''}`}>Salas</Link>
        </li>
        <li>
          <Link to="/disciplinas" className={`${styles.link} ${location.pathname === '/disciplinas' ? styles.active : ''}`}>Disciplinas</Link>
        </li>
        <li>
          <Link to="/turmas" className={`${styles.link} ${location.pathname === '/turmas' ? styles.active : ''}`}>Turmas</Link>
        </li>
        <li>
          <Link to="/professores" className={`${styles.link} ${location.pathname === '/professores' ? styles.active : ''}`}>Professores</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
