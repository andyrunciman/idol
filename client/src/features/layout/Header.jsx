import React from 'react';
import styles from './Header.module.css';
import Container from './Container';

function Header(props) {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.content}>
          <h1 className={styles.title}>{props.title}</h1>
          {props.children}
        </div>
      </Container>
    </header>
  );
}

export default Header;
