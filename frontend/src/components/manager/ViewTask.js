import React from 'react';
import { TextField, Button } from '@mui/material';
import styles from "../common/style.module.css"
import CancelIcon from '@mui/icons-material/Cancel';

const ViewTask = ({ task, onCancel }) => {
  const getIndianTime = (utcDateString) => {
    const indianDate = new Date(utcDateString).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium' });
    return indianDate;
  };

  return (
    <div>
      <form className={`${styles.form} ${styles.container}`}>
        <div className={styles.cancelIcon} onClick={onCancel}>
          <CancelIcon />
        </div>
        <h2 className={styles.heading}>Task Details</h2>
        <TextField label="Title" style={{ marginBottom: '20px' }} value={task.title} />
        <TextField label="Description" style={{ marginBottom: '20px' }} value={task.desc} />
        <TextField label="Email" style={{ marginBottom: '20px' }} value={task.email} type="email" />
        <TextField label="Deadline" style={{ marginBottom: '20px' }} value={getIndianTime(task.deadline)} />
        <Button variant="contained" color="primary" onClick={onCancel}>
          Back
        </Button>
      </form>
    </div>
  );
};

export default ViewTask;
