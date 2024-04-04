import { ReactElement } from 'react';
import styles from './Header.module.scss';

const Header = (): ReactElement => {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>
        <span className={styles.header__span}>Ruble</span> currency chart
      </h1>
    </header>
  );
};

export default Header;
