import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from "../common/style.module.css"
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AssignTask = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const managerName = localStorage.getItem('name');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (message === '') {
        setError('Notification message can not be empty.');
        return;
      }
      
      const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/users`);
      const users = response.data;
      
      const usersData = users
        .filter((user) => user.isManager === false)
        .map((user) => ({
          email: user.email,
          name: user.name,
        }));
        
      await axios.post(`${process.env.REACT_APP_BACKEND}/api/notification`, {
        message,
        users: usersData,
        managerName
      });
      navigate("/");

    } catch (error) {
      console.error(error);

      setError('Please enter a valid notification message.');
    }
  };

  return (
    <div className={`${styles.dis} ${styles.minH}`}>
      <Form className={`${styles.form} ${styles.container}`} onSubmit={handleSubmit}>
        <div className={styles.cancelIcon} onClick={() => { navigate('/') }}>
          <CancelIcon />
        </div>
        <h2 className={styles.heading}>Add Notification</h2>
        <Form.Group controlId="message" style={{ marginBottom: '20px' }}>
          <Form.Label>Notification message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter notification message"
            value={message}
            style={{ minHeight: '40vh' }}
            onChange={(e) => setMessage(e.target.value)}
          />
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Notification
        </Button>
      </Form></div>
  );
};

export default AssignTask;
