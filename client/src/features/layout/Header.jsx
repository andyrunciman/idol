import React from 'react';
import styles from './Header.module.css';
import Container from './Container';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.content}>
          <Link className={styles.title} to="/dashboard">
            {props.title}
          </Link>

          {props.children}
        </div>
      </Container>
    </header>
  );
}

export default Header;
