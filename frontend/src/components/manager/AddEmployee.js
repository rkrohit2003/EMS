import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import styles from "../common/style.module.css"
import { useNavigate } from 'react-router-dom';

const AddEmployeeForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      password,
      phone,
      address,
      department,
      salary,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/user', formData);
      console.log('Added employee:', response.data);
      navigate("/listEmployee");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.dis}>
      <form className={`${styles.form} ${styles.container} ${styles.minHAddEmp}`} onSubmit={handleSubmit}>
        <div className={styles.cancelIcon} onClick={() => navigate('/')}>
          <CancelIcon />
        </div>
        <h2 className={styles.heading}>Add Employee</h2>
        <TextField
          label="Name"
          style={{ marginBottom: '20px' }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          style={{ marginBottom: '20px' }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
        />
        <TextField
          label="Password"
          style={{ marginBottom: '20px' }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
        />
        <TextField
          label="Phone"
          style={{ marginBottom: '20px' }}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          type="tel"
        />
        <TextField
          label="Address"
          style={{ marginBottom: '20px' }}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <TextField
          label="Department"
          style={{ marginBottom: '20px' }}
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
        <TextField
          label="Salary"
          style={{ marginBottom: '20px' }}
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
          type="number"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={styles.button}
        >
          Add Employee
        </Button>
      </form></div>
  );
};

export default AddEmployeeForm;
