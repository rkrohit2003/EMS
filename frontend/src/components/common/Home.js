import React from 'react'
import styles from "./style.module.css"

export const Home = () => {
  const userName = localStorage.getItem("name");
  return (
    <div className={styles.dis}>
      <p className={styles.home}>Welcome <b style={{ color: "rgb(17,143,133)" }}>{userName} !</b></p>
    </div>
  )
}
