import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from "../common/style.module.css"
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RequestLeave = () => {
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const leaveData = {
        email: localStorage.getItem('isLoggedIn'),
        reason, startDate, endDate
      };

      await axios.post('http://localhost:8000/api/leave', leaveData);
      navigate("/requestedLeave");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.dis}>
      <Form className={`${styles.form} ${styles.container}`} onSubmit={handleSubmit}>
        <div className={styles.cancelIcon} onClick={() => { navigate('/') }}>
          <CancelIcon />
        </div>
        <h2 className={styles.heading}>Request Leave</h2>

        <Form.Group controlId="reason">
          <Form.Label>Reason</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter leave reason"
            style={{ marginBottom: '20px' }}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            style={{ marginBottom: '20px' }}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="endDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            style={{ marginBottom: '20px' }}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Request Leave
        </Button>
      </Form></div>
  );
};

export default RequestLeave;
