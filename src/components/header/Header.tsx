import React from 'react';

import styles from './Header.module.scss';

export default function Header() {
  return (
    <div>
      <nav className={`${styles.header} navbar navbar-expand navbar-light`}>
        <div className="collapse navbar-collapse" id="navbarNav">
          <h6>Hack ideas</h6>
        </div>
      </nav>
    </div>
  );
}
