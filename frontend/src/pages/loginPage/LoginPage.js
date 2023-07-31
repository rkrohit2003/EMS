import React from 'react'
import Login from '../../components/login/Login'
import SideImage from '../../components/sideImage/SideImage'
import styles from "./LoginPage.module.css"

export const LoginPage = ({ setIsLoggedIn, setIsManager }) => {
  return (
    <React.Fragment>
      <div className={styles.Combine}>
        <Login setIsLoggedIn={setIsLoggedIn} setIsManager={setIsManager} />
        <SideImage />
      </div>
    </React.Fragment>
  )
}
