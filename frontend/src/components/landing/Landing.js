import React from 'react'
import styles from './Landing.module.css'
import { useNavigate } from 'react-router-dom'

export const Landing = () => {
  const Navigate = useNavigate();
  return (
    <div>
      <div className={styles.backgroundImage}>
        <p className={styles.p1}>WELCOME TO</p>
        <p className={styles.p2}>EMPLOYEE MANAGEMENT SYSTEM</p>
        <br></br>
        <button className={styles.Button} onClick={() => Navigate('/login')}>LOGIN</button>
      </div>
    </div>
  )
}
