import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './Header.module.scss';
import logo from '../../assets/images/logo.png';

export default function Header() {
  const history = useHistory();

  return (
    <div>
      <nav className={`${styles.header} navbar navbar-expand navbar-light`}>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          <div>
            <img src={logo} className="w-25 pr-2" />
            <span className="font-weight-bold">Hack ideas</span>
          </div>
          <div
            className="font-weight-bolder text-info cursor-pointer"
            onClick={() => history.push('')}
          >
            Logout
          </div>
        </div>
      </nav>
    </div>
  );
}
